import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Entypo, FontAwesome6, Octicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='customer'
        options={{
          title: "Customer",
          tabBarIcon: () => (
            <FontAwesome6 name='user-large' size={24} color='black' />
          ),
        }}
      />
      <Tabs.Screen
        name='transaction'
        options={{
          title: "Transaction",
          tabBarIcon: ({ color }) => (
            <Octicons name='credit-card' size={24} color='black' />
          ),
        }}
      />
      <Tabs.Screen
        name='product'
        options={{
          title: "Product",
          tabBarIcon: ({ color }) => (
            <Entypo name='dropbox' size={24} color='black' />
          ),
        }}
      />
    </Tabs>
  );
}
