# 📍 QR Location Share App

A React Native app that scans QR codes containing phone numbers, fetches your current location, and shares it via WhatsApp with one tap.

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

## 🚀 Quick Start

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
