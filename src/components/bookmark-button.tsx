import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { isBookmarked, toggleBookmark } from '@/db/repos/bookmarks';
import type { BookmarkItemType } from '@/types';

export function BookmarkButton({
  db,
  itemType,
  itemId,
  size = 26,
}: {
  db: Parameters<typeof isBookmarked>[0];
  itemType: BookmarkItemType;
  itemId: number;
  size?: number;
}) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    isBookmarked(db, itemType, itemId).then((v) => {
      if (mounted) setSaved(v);
    });
    return () => {
      mounted = false;
    };
  }, [db, itemType, itemId]);

  const onPress = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const next = await toggleBookmark(db, itemType, itemId);
      setSaved(next);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={saved ? 'Remove from saved library' : 'Save to library'}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={[styles.icon, { fontSize: size }, saved ? styles.saved : styles.unsaved]}>
        {saved ? '★' : '☆'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  icon: {
    lineHeight: undefined,
  },
  saved: {
    color: colors.gold,
  },
  unsaved: {
    color: colors.textMuted,
  },
});