import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { Card } from '@/components/card';
import { useDatabase } from '@/hooks/use-database';
import { getAutoCheck, getMonitorMeta, setAutoCheck } from '@/db/repos/monitor';

const ROADMAP = [
  'RTI Module — drafting, PIO directory & tracker',
  'Forms & Drafts — guided Q&A → PDF/DOCX export',
  'SOPs — step-by-step legal how-to guides',
  'Legal Diary & Reminders — hearings, deadlines, push alerts',
  'Court Case Tracker — CNR search, cause lists',
  'Police Resources — station finder, helplines, arrest rights',
  'Judgment Search — plain-language case summaries',
  'AI Legal Assistant — answers cited to official provisions only',
  'Regional languages — Hindi first, then Marathi, Tamil, Telugu, Bengali',
];

export default function SettingsScreen() {
  const db = useDatabase();
  const [autoCheck, setAutoOn] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const auto = await getAutoCheck(db);
      const meta = await getMonitorMeta(db);
      if (mounted) {
        setAutoOn(auto);
        setLastChecked(meta.lastChecked);
        setLastError(meta.lastError);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [db]);

  const toggleAutoCheck = (on: boolean) => {
    setAutoOn(on);
    void setAutoCheck(db, on);
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.cardTitle}>About LegalPocket</Text>
        <Text style={styles.body}>
          LegalPocket is a free, offline-first legal reference app for India — the
          Constitution, Bare Acts, and tools to draft, track and understand the law,
          in one place. Access to legal information is a public good: no paywalls,
          no ads, no subscriptions.
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Important disclaimer</Text>
        <Text style={styles.body}>
          ⚠️ LegalPocket is an informational reference tool. Nothing in this app —
          including statutory text, templates, summaries or guides — constitutes
          legal advice, nor is it a substitute for the advice of a qualified
          advocate. LegalPocket is not affiliated with, or endorsed by, any
          government department. Statutory text is being sourced from official
          publications (India Code, the e-Gazette) and verified before publication.
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Update monitoring</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Check for legal updates automatically</Text>
          <Switch
            value={autoCheck}
            onValueChange={toggleAutoCheck}
            trackColor={{ false: colors.navy600, true: colors.goldDim }}
            thumbColor={autoCheck ? colors.gold : colors.textMuted}
          />
        </View>
        {lastChecked ? (
          <Text style={styles.body}>Last checked: {new Date(lastChecked).toLocaleString()}</Text>
        ) : (
          <Text style={styles.body}>No check has run yet.</Text>
        )}
        {lastError ? (
          <Text style={styles.body}>
            Latest source error: {lastError}. The app stays fully offline — updates resume when the
            feed is reachable.
          </Text>
        ) : null}
        <Text style={styles.note}>
          When enabled, LegalPocket checks a free static feed on launch and flags anything new for
          editorial review (monitored → detected → review → publish).
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Content update pipeline</Text>
        <Text style={styles.body}>
          Amendments, commencements and bill status flow through a monitored →
          detected → editorial review → publish pipeline, each step recorded in an
          audit trail. Nothing is published without review.
        </Text>
        <Pressable
          onPress={() => router.push('/updates/inbox')}
          style={({ pressed }) => [styles.pipelineLink, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.pipelineLinkText}>Open editorial inbox (internal tool)</Text>
        </Pressable>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Content status</Text>
        <View style={styles.dotRow}>
          <View style={[styles.dot, { backgroundColor: '#3FA46A' }]} />
          <Text style={styles.dotText}>Seed content for the MVP scaffold is loaded.</Text>
        </View>
        <Text style={styles.body}>
          The full Constitution and key Bare Acts are represented in structure; a
          curated set of landmark Articles and Sections carries full text. Production
          ingestion from official India Code / e-Gazette sources (with editorial
          verification and version history) is the Phase-1 content pipeline.
        </Text>
      </Card>

      <View>
        <Text style={styles.sectionTitle}>Roadmap</Text>
        {ROADMAP.map((item, i) => (
          <View key={item} style={styles.roadRow}>
            <Text style={styles.roadIndex}>{String(i + 1).padStart(2, '0')}</Text>
            <Text style={styles.roadText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>LegalPocket v0.1.0 (MVP scaffold) · Made in India 🇮🇳</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  cardTitle: { color: colors.gold, fontSize: 16, fontWeight: '700', marginBottom: spacing.sm },
  body: { color: colors.textSecondary, fontSize: 13.5, lineHeight: 20 },
  dotRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  dot: { width: 10, height: 10, borderRadius: radius.pill },
  dotText: { color: colors.text, fontSize: 13, flex: 1 },
  pipelineLink: {
    marginTop: spacing.md,
    backgroundColor: colors.navy800,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  pipelineLinkText: { color: colors.gold, fontSize: 13, fontWeight: '700' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginBottom: spacing.sm },
  toggleLabel: { color: colors.text, fontSize: 14, fontWeight: '600', flex: 1 },
  note: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: spacing.sm },
  pressed: { opacity: 0.7 },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: spacing.md },
  roadRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.sm },
  roadIndex: { color: colors.gold, fontSize: 12.5, fontWeight: '700', width: 24 },
  roadText: { color: colors.textSecondary, fontSize: 13.5, flex: 1, lineHeight: 19 },
  footer: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: spacing.lg },
});