import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { colors } from "../../src/theme/tokens";
import { Icon } from "../../src/components/ui/Icon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dash",
          tabBarIcon: ({ color }) => (
            <Icon name="dashboard" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: "Track",
          tabBarIcon: ({ color }) => (
            <Icon name="backpack" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="keys"
        options={{
          title: "Keys",
          tabBarIcon: ({ color }) => (
            <Icon name="keyboard" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Sets",
          tabBarIcon: ({ color }) => (
            <Icon name="settings" size={24} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "#121212",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 0,
    elevation: 8,
    paddingBottom: 24,
    paddingTop: 8,
    height: 80,
    overflow: "hidden",
  },
  tabBarLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    letterSpacing: 0.6,
  },
});
