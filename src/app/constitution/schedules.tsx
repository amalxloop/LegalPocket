import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { listSchedules } from '@/db/repos/constitution';
import { SectionListEmpty } from '@/components/empty-state';

interface Schedule {
  id: number;
  number: string;
  title: string;
  body: string | null;
}

export default function SchedulesScreen() {
  const db = useDatabase();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    listSchedules(db).then((rows) => {
      if (mounted) {
        setSchedules(rows);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [db]);

  return (
    <>
      <Stack.Screen options={{ title: 'Schedules' }} />
      <FlatList
        style={styles.root}
        data={schedules}
        keyExtractor={(s) => s.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <View style={styles.cardHead}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>
              <Text style={styles.cardNum}>Schedule {item.number}</Text>
            </View>
            {!!item.body && <Text style={styles.cardBody}>{item.body}</Text>}
          </Pressable>
        )}
        ListEmptyComponent={
          loading ? <SectionListEmpty title="Loading…" /> : <SectionListEmpty title="No schedules" />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  pressed: { opacity: 0.75 },
  cardHead: { gap: 2 },
  cardTitle: { color: colors.text, fontSize: 15.5, fontWeight: '700' },
  cardNum: { color: colors.gold, fontSize: 12.5, fontWeight: '700', marginTop: 2 },
  cardBody: { color: colors.textSecondary, fontSize: 13.5, lineHeight: 19 },
});