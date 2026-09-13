import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme/colors';
import { Card } from '@/components/card';

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
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: spacing.md },
  roadRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.sm },
  roadIndex: { color: colors.gold, fontSize: 12.5, fontWeight: '700', width: 24 },
  roadText: { color: colors.textSecondary, fontSize: 13.5, flex: 1, lineHeight: 19 },
  footer: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: spacing.lg },
});