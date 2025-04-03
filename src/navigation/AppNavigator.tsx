import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRScannerScreen from '../features/qr-scanner/screens/QRScannerScreen';
import ShareScreen from '../features/share/screens/ShareScreen';

export type RootStackParamList = {
  QRScanner: undefined;
  Share: { phoneNumber: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="QRScanner">
      <Stack.Screen 
        name="QRScanner" 
        component={QRScannerScreen}
        options={{ title: 'Scan QR Code' }}
      />
      <Stack.Screen 
        name="Share" 
        component={ShareScreen}
        options={{ title: 'Share Location' }}
      />
    </Stack.Navigator>
  );
}