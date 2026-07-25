import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { ConnectionProvider } from "../src/contexts/ConnectionContext";
import { ConnectionModal } from "../src/components/modals/ConnectionModal";
import {
  SafeAreaContext,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const insets = useSafeAreaInsets();

  if (!loaded && !error) {
    return null;
  }

  return (
    <ConnectionProvider>
      <SafeAreaProvider
        style={{
          paddingTop: insets.top,
          backgroundColor: "#000",
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <ConnectionModal />
      </SafeAreaProvider>
    </ConnectionProvider>
  );
}
