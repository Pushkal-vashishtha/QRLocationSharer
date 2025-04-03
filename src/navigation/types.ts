import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  QRScanner: undefined;
  Share: { phoneNumber: string };
};

export type QRScannerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'QRScanner'
>;

export type ShareScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Share'
>;