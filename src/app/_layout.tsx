import { useEffect, useRef } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/theme/colors';
import { DatabaseProvider, useDatabaseReady } from '@/hooks/use-database';
import { getDb } from '@/db/database';
import { getAutoCheck, checkForUpdates } from '@/db/repos/monitor';

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
  const checkedRef = useRef(false);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      if (checkedRef.current) return;
      checkedRef.current = true;
      try {
        const db = await getDb();
        const auto = await getAutoCheck(db);
        if (auto) await checkForUpdates(db);
      } catch {
        // Background check must never break the app; the feed is re-checkable manually.
      }
    })();
  }, [ready]);

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
        <Stack.Screen name="updates/index" options={{ title: 'Recent Legal Updates' }} />
        <Stack.Screen name="updates/inbox" options={{ title: 'Editorial Inbox' }} />
        <Stack.Screen
          name="updates/[updateId]"
          options={{ title: 'Update', headerBackTitle: 'Updates' }}
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