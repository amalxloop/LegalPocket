import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { listBookmarks, removeBookmark } from '@/db/repos/bookmarks';
import type { BookmarkedItem, BookmarkItemType } from '@/types';
import { SectionListEmpty } from '@/components/empty-state';

const TYPE_LABEL: Record<BookmarkItemType, string> = {
  act: 'Act',
  section: 'Section',
  article: 'Article',
  part: 'Part',
};

export default function LibraryScreen() {
  const db = useDatabase();
  const [items, setItems] = useState<BookmarkedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const rows = await listBookmarks(db);
      setItems(rows);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const onOpen = (item: BookmarkedItem) => {
    if (item.itemType === 'section') router.push(`/sections/${item.itemId}`);
    else if (item.itemType === 'article') router.push(`/articles/${item.itemId}`);
    else if (item.itemType === 'act') router.push(`/acts/${item.itemId}`);
    else router.push(`/constitution/${item.itemId}`);
  };

  return (
    <FlatList
      style={styles.root}
      data={items}
      keyExtractor={(i) => `${i.itemType}-${i.itemId}`}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Pressable style={styles.rowMain} onPress={() => onOpen(item)}>
            <Text style={styles.rowType}>{TYPE_LABEL[item.itemType]}</Text>
            <Text style={styles.rowTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.rowSubtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </Pressable>
          <Pressable
            hitSlop={8}
            onPress={async () => {
              await removeBookmark(db, item.itemType, item.itemId);
              refresh();
            }}
            accessibilityLabel="Remove bookmark"
            style={styles.remove}
          >
            <Text style={styles.removeText}>✕</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={
        loading ? (
          <SectionListEmpty title="Loading…" />
        ) : (
          <SectionListEmpty
            title="Nothing saved yet"
            hint="Tap the star ☆ on any Article, Act or Section to save it here for offline reading."
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  list: { padding: spacing.lg, gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  rowMain: { flex: 1 },
  rowType: { color: colors.gold, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 2 },
  rowSubtitle: { color: colors.textSecondary, fontSize: 12.5, marginTop: 1 },
  remove: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.navy800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: { color: colors.textMuted, fontSize: 13 },
});