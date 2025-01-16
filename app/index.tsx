import { Image, StyleSheet, Platform, View } from "react-native";
import { Button } from "@ui-kitten/components";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.navigationContainer}>
        <Button style={styles.button} onPress={() => navigateTo("/customer")}>
          Go to Customer
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigateTo("/transaction")}
        >
          Go to Transaction
        </Button>
        <Button style={styles.button} onPress={() => navigateTo("/product")}>
          Go to Product
        </Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navigationContainer: {
    marginVertical: 16,
    gap: 12,
  },
  button: {
    marginVertical: 4,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
