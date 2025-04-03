import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../navigation/types';

export default function QRScannerScreen() {
  const [facing, setFacing] = useState<'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<import('@react-navigation/native').NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    
    // to have phone number in the format +1234567890 or 1234567890
    const phoneRegex = /^(\+?\d{10,15})$/;
    const phoneNumber = data.trim();
    
    if (phoneRegex.test(phoneNumber)) {
      navigation.navigate('Share', { 
        phoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `${phoneNumber}`
      });
    } else {
      Alert.alert(
        'Invalid QR Code',
        'The scanned code doesn\'t contain a valid phone number',
        [{ text: 'OK', onPress: () => setScanned(false) }]
      );
    }
  };

  if (!permission) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (!permission.granted) return (
    <View style={styles.container}>
      <Text>Camera permission required</Text>
      <Button title="Grant Permission" onPress={requestPermission} />
    </View>
  );

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
      </CameraView>
      {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
  },
});