import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/theme/colors';
import { DatabaseProvider, useDatabaseReady } from '@/hooks/use-database';

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <RootNavigator />
    </DatabaseProvider>
  );
}

const headerStyle = {
  headerStyle: { backgroundColor: colors.navy900 },
  headerTintColor: colors.text,
  headerTitleStyle: { color: colors.text, fontWeight: '700' as const },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.navy950 },
};

function RootNavigator() {
  const ready = useDatabaseReady();
  if (!ready) {
    return (
      <View style={styles.splash}>
        <StatusBar style="light" />
        <Text style={styles.splashTitle}>LegalPocket</Text>
        <Text style={styles.splashTag}>Loading the library…</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={headerStyle}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="acts/index" options={{ title: 'Bare Acts' }} />
        <Stack.Screen
          name="acts/[actId]"
          options={{ title: 'Act', headerBackTitle: 'Acts' }}
        />
        <Stack.Screen
          name="sections/[sectionId]"
          options={{ title: 'Section', headerBackTitle: 'Back' }}
        />
        <Stack.Screen name="constitution/index" options={{ title: 'Constitution of India' }} />
        <Stack.Screen name="constitution/schedules" options={{ title: 'Schedules' }} />
        <Stack.Screen
          name="constitution/[partId]"
          options={{ title: 'Part', headerBackTitle: 'Constitution' }}
        />
        <Stack.Screen
          name="articles/[articleId]"
          options={{ title: 'Article', headerBackTitle: 'Back' }}
        />
        <Stack.Screen name="compare/index" options={{ title: 'Compare Laws' }} />
        <Stack.Screen
          name="compare/[setId]"
          options={{ title: 'Comparison', headerBackTitle: 'Compare' }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.navy950,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  splashTitle: {
    color: colors.gold,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  splashTag: { color: colors.textMuted, fontSize: 13 },
});