// {
//   "expo": {
//     "name": "airbnb-clone",
//     "slug": "airbnb-clone",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/images/icon.png",
//     "scheme": "myapp",
//     "userInterfaceStyle": "automatic",
//     "splash": {
//       "image": "./assets/images/splash.png",
//       "resizeMode": "contain",
//       "backgroundColor": "#ffffff"
//     },
//     "assetBundlePatterns": [
//       "**/*"
//     ],
//     "ios": {
//       "supportsTablet": true
//     },
//     "android": {
//       "adaptiveIcon": {
//         "foregroundImage": "./assets/images/adaptive-icon.png",
//         "backgroundColor": "#ffffff"
//       }
//     },
//     "web": {
//       "bundler": "metro",
//       "output": "static",
//       "favicon": "./assets/images/favicon.png"
//     },
//     "plugins": [
//       "expo-router"
//     ],
//     "experiments": {
//       "typedRoutes": true,
//       "tsconfigPaths": true
//     }
//   }
// }

import { ExpoConfig } from "expo/config";

module.exports = (): ExpoConfig => ({
  name: "airbnb_clone",
  slug: "airbnb_clone",
  scheme: "airbnb_clone",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  androidStatusBar: {
    translucent: false,
  },
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.airbnb.clone",
    buildNumber: "0.0.1",
    supportsTablet: false,
  },
  android: {
    softwareKeyboardLayoutMode: "pan",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.airbnb.clone",
  },
  plugins: ["expo-router"],
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
});
