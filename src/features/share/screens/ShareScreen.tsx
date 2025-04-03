import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getCurrentLocation, formatLocationForSharing, LocationResult } from '../../../services/locationService';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { Linking, Platform } from 'react-native';

// Define the RootStackParamList type if not already defined elsewhere
type RootStackParamList = {
  Share: { phoneNumber: string };
};

type ShareScreenRouteProp = RouteProp<RootStackParamList, 'Share'>;

export default function ShareScreen() {
  const { params: { phoneNumber } } = useRoute<ShareScreenRouteProp>();
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLocation = async () => {
    try {
      setLocation(await getCurrentLocation());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Location error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocation();
  }, []);

  const shareOnWhatsApp = async () => {
    if (!location) return;

    const message = formatLocationForSharing(location);
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        if (Platform.OS === 'android') {
          await IntentLauncher.startActivityAsync('android.intent.action.VIEW', { data: url });
        } else {
          await Linking.openURL(url);
        }
      } else {
        Alert.alert(
          'WhatsApp Not Installed',
          'Share via other app?',
          [
            { text: 'Cancel' },
            { text: 'Share', onPress: () => Sharing.shareAsync(message) }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share location');
    }
  };

  if (loading) return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Getting your location...</Text>
    </View>
  );

  if (error || !location) return (
    <View style={styles.container}>
      <Text style={styles.error}>{error || 'Location unavailable'}</Text>
      <Button title="Retry" onPress={() => {
        setLoading(true);
        setError(null);
        loadLocation();
      }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Location With</Text>
      <Text style={styles.phone}>{phoneNumber}</Text>
      
      <View style={styles.locationBox}>
        <Text>Coordinates:</Text>
        <Text>{location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}</Text>
        {location.address && <Text>Address: {location.address}</Text>}
      </View>

      <Button 
        title="Share via WhatsApp" 
        onPress={shareOnWhatsApp} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    marginBottom: 20,
  },
  locationBox: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 30,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});