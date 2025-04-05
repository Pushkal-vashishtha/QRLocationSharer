import * as Location from 'expo-location';
import { Alert } from 'react-native';

export type LocationResult = {
  coords: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  address?: string;
};

export const getCurrentLocation = async (): Promise<LocationResult> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') throw new Error('Permission denied');

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return {
      coords: {
        ...location.coords,
        accuracy: location.coords.accuracy ?? undefined,
      },
      address: address[0] ? [
        address[0].street,
        address[0].city,
        address[0].country
      ].filter(Boolean).join(', ') : undefined,
    };
  } catch (error) {
    Alert.alert('Location Error', error instanceof Error ? error.message : 'Failed to get location');
    throw error;
  }
};

export const formatLocationForSharing = (location: LocationResult): string => {
  return `📍 My Location:
Lat: ${location.coords.latitude.toFixed(6)}
Lng: ${location.coords.longitude.toFixed(6)}
${location.address ? `Address: ${location.address}` : ''}\n\n
Google Maps: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;
};