import { router, type Href } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme/colors';
import { Card } from '@/components/card';

interface ModuleCard {
  key: string;
  title: string;
  icon: string;
  tagline: string;
  route?: Href;
  phase: 'live' | 'roadmap';
}

const MODULES: ModuleCard[] = [
  { key: 'constitution', title: 'Constitution of India', icon: '📜', tagline: 'Preamble, all Parts, Articles & Schedules — offline', route: '/constitution', phase: 'live' },
  { key: 'acts', title: 'Bare Acts', icon: '📚', tagline: 'Central statutes with section-wise navigation', route: '/acts', phase: 'live' },
  { key: 'compare', title: 'Compare Laws', icon: '🔄', tagline: 'IPC↔BNS · CrPC↔BNSS · Evidence↔BSA', route: '/compare', phase: 'live' },
  { key: 'search', title: 'United Legal Search', icon: '🔍', tagline: 'One search across every module', route: '/search', phase: 'live' },
  { key: 'library', title: 'Saved Library', icon: '⭐', tagline: 'Your bookmarks in one place', route: '/library', phase: 'live' },
  { key: 'updates', title: 'Recent Legal Updates', icon: '📰', tagline: 'Amendments, commencements & bill status', route: '/updates', phase: 'live' },
  { key: 'drafts', title: 'Forms & Drafts', icon: '✍️', tagline: 'Affidavits, notices, rent agreements…', phase: 'roadmap' },
  { key: 'sops', title: 'How-To Guides (SOPs)', icon: '🧭', tagline: 'Step-by-step: FIR, RTI, consumer complaints…', phase: 'roadmap' },
  { key: 'rti', title: 'RTI Module', icon: '📨', tagline: 'Draft, track and appeal RTI applications', phase: 'roadmap' },
  { key: 'police', title: 'Police Resources', icon: '🚨', tagline: 'Station finder, helplines, arrest rights', phase: 'roadmap' },
  { key: 'guidebooks', title: 'Guidebooks', icon: '📖', tagline: 'Plain-language legal explainers', phase: 'roadmap' },
  { key: 'diary', title: 'Legal Diary', icon: '🗓️', tagline: 'Case diary, hearing dates & reminders', phase: 'roadmap' },
  { key: 'courts', title: 'Court Case Tracker', icon: '🏛️', tagline: 'CNR search, cause lists & judgments', phase: 'roadmap' },
];

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.headline}>
        <Text style={styles.logo}>LegalPocket</Text>
        <Text style={styles.tagline}>Access to justice, free for everyone.</Text>
      </View>
      <FlatList
        data={MODULES}
        keyExtractor={(m) => m.key}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              ⚠️ LegalPocket is a free legal-literacy reference app. Content is
              informational and not a substitute for advice from a lawyer.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ModuleTile module={item} />
        )}
      />
    </View>
  );
}

function ModuleTile({ module }: { module: ModuleCard }) {
  const route = module.route;
  const content = (
    <Card style={module.phase === 'roadmap' ? [styles.tile, styles.tileRoadmap] : styles.tile}>
      <Text style={styles.tileIcon}>{module.icon}</Text>
      <Text style={styles.tileTitle}>{module.title}</Text>
      <Text style={styles.tileTagline}>{module.tagline}</Text>
      {module.phase === 'roadmap' && (
        <View style={styles.soonPill}>
          <Text style={styles.soonText}>Roadmap</Text>
        </View>
      )}
    </Card>
  );

  if (!route) return content;
  return (
    <Pressable
      style={({ pressed }) => [styles.tilePress, pressed && styles.tilePressed]}
      onPress={() => router.push(route)}
      accessibilityRole="button"
      accessibilityLabel={module.title}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  headline: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  logo: {
    color: colors.gold,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagline: { color: colors.textSecondary, marginTop: 2, fontSize: 14 },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  column: { gap: spacing.md },
  disclaimer: {
    backgroundColor: colors.infoBg,
    borderColor: colors.navy600,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  disclaimerText: { color: colors.info, fontSize: 12.5, lineHeight: 18 },
  tile: { flex: 1, minHeight: 132 },
  tileRoadmap: { opacity: 0.62 },
  tilePress: { flex: 1 },
  tilePressed: { opacity: 0.7 },
  tileIcon: { fontSize: 26, marginBottom: spacing.sm },
  tileTitle: { color: colors.text, fontWeight: '700', fontSize: 15, marginBottom: 2 },
  tileTagline: { color: colors.textSecondary, fontSize: 12, lineHeight: 16 },
  soonPill: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.navy700,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  soonText: { color: colors.textMuted, fontSize: 10, fontWeight: '600' },
});