# 📍 QR Location Share App

A React Native app that scans QR codes containing phone numbers, fetches your current location, and shares it via WhatsApp with one tap.


## Link for .apk file is 
updated => https://expo.dev/accounts/pushkalvas/projects/qrlocationsharer/builds/447c832f-3e57-4e0f-913e-ff8dc36c2a8b

old one => https://expo.dev/accounts/pushkalvas/projects/qrlocationsharer/builds/848c4b9d-0f8f-4a6c-ac44-2a57eaa48870


## ✨ Features

- **QR Scanner** - Scan phone numbers from QR codes using device camera
- **Precise Location** - Get GPS coordinates with address reverse geocoding
- **WhatsApp Integration** - Auto-populate messages with location details
- **Permission Handling** - Smart requests for camera and location access
- **Cross-Platform** - Works on both iOS and Android


## 🛠️ Tech Stack

- Expo SDK 52
- React Native
- TypeScript
- Expo Camera (with built-in barcode scanning)
- Expo Location
- React Navigation
- Expo Sharing

## 🚀 Demo Images =>
<table>
  <tr>
    <td><img src="/assets/1.jpeg" width="350" height="350"></td>
    <td><img src="/assets/2.jpeg" width="350" height="350"></td>
  </tr>
  <tr>
    <td><img src="/assets/3.jpeg" width="350" height="350"></td>
    <td><img src="/assets/4.jpeg" width="350" height="350"></td>
    
  </tr>
  <tr>
    <td><img src="/assets/5.jpeg" width="350" height="350"></td>
    <td><img src="/assets/6.jpeg" width="350" height="350"></td>
  </tr>
    <tr>
    <td><img src="/assets/7.jpeg" width="350" height="350"></td>
    <td><img src="/assets/8.jpeg" width="350" height="350"></td>
  </tr>
</table>


### Prerequisites
- Node.js 16+
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)
- Physical device recommended (for camera/location testing)

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/location-share-app.git
cd location-share-app

# Install dependencies
yarn install
# or
npm install

# Start development server
expo start
