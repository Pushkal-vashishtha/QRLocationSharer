import * as Location from 'expo-location';
import { Alert } from 'react-native';

type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
};

type LocationResult = {
  coords: Coordinates;
  address?: string;
  timestamp?: number;
};

export const getCurrentLocation = async (): Promise<LocationResult> => {
  try {
// request to have permissions for location
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }

    // request to get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    //  Reverse geocode to get address in human readable format 
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return {
      coords: location.coords,
      address: address[0] 
        ? `${address[0].street}, ${address[0].city}, ${address[0].country}`
        : 'Unknown location',
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('Location error:', error);
    Alert.alert(
      'Location Error',
      'Could not get your location. Please ensure location services are enabled.'
    );
    throw error;
  }
};

export const formatLocationForSharing = (location: LocationResult): string => {
  return `📍 My Current Location:
Latitude: ${location.coords.latitude.toFixed(6)}
Longitude: ${location.coords.longitude.toFixed(6)}
${location.address ? 'Address: ' + location.address : ''}

Shared via Location Share App`;
};