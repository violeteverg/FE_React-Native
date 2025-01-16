import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainStoreProvider } from "@/zustand/zustandProvider";
import { ApplicationProvider, ModalService } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

SplashScreen.preventAutoHideAsync();
ModalService.setShouldUseTopInsets = true;
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainStoreProvider>
        <SafeAreaProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <ThemeProvider
              value={colorScheme === "dark" ? DefaultTheme : DarkTheme}
            >
              <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='+not-found' />
              </Stack>
              <StatusBar style='auto' />
            </ThemeProvider>
          </ApplicationProvider>
        </SafeAreaProvider>
      </MainStoreProvider>
    </QueryClientProvider>
  );
}
