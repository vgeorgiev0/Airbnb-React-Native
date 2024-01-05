import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "@react-navigation/native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { customDarkTheme, customDefaultTheme } from "../constants/Themes";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Regular: require("../assets/fonts/Barlow-Regular.ttf"),
    Medium: require("../assets/fonts/Barlow-Medium.ttf"),
    SemiBold: require("../assets/fonts/Barlow-SemiBold.ttf"),
    Bold: require("../assets/fonts/Barlow-Bold.ttf"),
    Italic: require("../assets/fonts/Barlow-Italic.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={Constants?.expoConfig?.extra?.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded]);

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? customDarkTheme : customDefaultTheme}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            title: "Log in or sign up",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "SemiBold",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="close-outline" size={24} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="close-outline" size={24} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
// ! https://www.youtube.com/watch?v=iWzUZiVoiR0&t=389s || 1:10:40
