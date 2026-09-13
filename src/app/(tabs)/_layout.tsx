import { Tabs } from 'expo-router';
import { StyleSheet, Text, type ColorValue } from 'react-native';
import { colors } from '@/theme/colors';

function TabIcon({ color, glyph }: { color: ColorValue; glyph: string }) {
  return <Text style={[styles.icon, { color }]}>{glyph}</Text>;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.navy900,
          borderTopColor: colors.navy700,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: colors.navy900 },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: colors.navy950 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabIcon color={color} glyph="🏠" />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'United Legal Search',
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <TabIcon color={color} glyph="🔍" />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Saved Library',
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => <TabIcon color={color} glyph="⭐" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings & About',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <TabIcon color={color} glyph="⚙️" />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 17,
  },
});