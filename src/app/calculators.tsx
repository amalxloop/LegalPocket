import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { Badge } from '@/components/badge';
import { SectionListEmpty } from '@/components/empty-state';
import {
  getCourtFeeRule,
  listCourtFeeJurisdictions,
  listLimitationEntries,
  listLimitationRefs,
  type CourtFeeRule,
  type LimitationEntry,
  type LimitationRef,
} from '@/db/repos/calculators';
import { computeCourtFee, formatINR, parseAmount } from '@/lib/court-fee';
import {
  addPeriod,
  daysUntil,
  formatDate,
  parseDateInput,
  today,
} from '@/lib/limitation';
import type { ContentConfidence, CourtFeeRuleRow } from '@/types';

type Tab = 'fee' | 'limitation';

function confidenceTone(c: ContentConfidence): 'active' | 'pending' | 'repealed' | 'neutral' {
  if (c === 'high') return 'active';
  if (c === 'medium') return 'pending';
  if (c === 'low') return 'repealed';
  return 'neutral';
}

export default function CalculatorsScreen() {
  const [tab, setTab] = useState<Tab>('fee');

  return (
    <View style={styles.root}>
      <View style={styles.tabs}>
        <TabButton label="Court Fee" active={tab === 'fee'} onPress={() => setTab('fee')} />
        <TabButton
          label="Limitation"
          active={tab === 'limitation'}
          onPress={() => setTab('limitation')}
        />
      </View>
      {tab === 'fee' ? <CourtFeeTab /> : <LimitationTab />}
    </View>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active && styles.tabButtonActive]}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

/* ---------------------------------- Court fee --------------------------------- */

function CourtFeeTab() {
  const db = useDatabase();
  const [jurisdictions, setJurisdictions] = useState<CourtFeeRuleRow[]>([]);
  const [rule, setRule] = useState<CourtFeeRule | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [pickOpen, setPickOpen] = useState(false);
  const [amountText, setAmountText] = useState('');
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      listCourtFeeJurisdictions(db).then((rows) => {
        if (!mounted) return;
        setJurisdictions(rows);
        setLoaded(true);
      });
      return () => {
        mounted = false;
      };
    }, [db]),
  );

  const select = useCallback(
    (next: string) => {
      setSlug(next);
      setPickOpen(false);
      getCourtFeeRule(db, next).then((r) => setRule(r));
    },
    [db],
  );

  const amount = parseAmount(amountText);
  const fee = useMemo(() => {
    if (!rule || rule.status !== 'ready' || amount == null) return null;
    return computeCourtFee(rule.bands, rule.cap, amount);
  }, [rule, amount]);

  return (
    <ScrollView contentContainerStyle={styles.pane}>
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Court-fee estimate for a plaint or petition from the claim amount.
          Select your state or Union Territory, enter the amount, and the
          ad-valorem fee is computed from that jurisdiction’s schedule.
        </Text>
      </View>
      <View style={styles.warn}>
        <Text style={styles.warnText}>
          ⚠️ Estimate only — court fees depend on the relief sought, forum, and
          local rules. Verify the final amount with the court fee counter or a
          lawyer before filing.
        </Text>
      </View>

      <Text style={styles.fieldLabel}>State / Union Territory</Text>
      <Pressable
        onPress={() => setPickOpen((o) => !o)}
        style={styles.select}
        accessibilityRole="button"
        accessibilityLabel="Select jurisdiction"
      >
        <Text style={styles.selectText}>
          {rule ? rule.name : 'Choose a jurisdiction…'}
        </Text>
        <Text style={styles.selectCaret}>{pickOpen ? '▴' : '▾'}</Text>
      </Pressable>
      {pickOpen && (
        <View style={styles.picker}>
          {jurisdictions.map((j) => (
            <Pressable
              key={j.slug}
              onPress={() => select(j.slug)}
              style={[
                styles.pickRow,
                j.slug === slug && styles.pickRowActive,
              ]}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.pickRowText,
                  j.slug === slug && styles.pickRowTextActive,
                ]}
              >
                {j.name}
              </Text>
              {j.status === 'unknown' && (
                <Text style={styles.pickUnknown}>no rates</Text>
              )}
            </Pressable>
          ))}
        </View>
      )}

      {loaded && jurisdictions.length === 0 && (
        <SectionListEmpty title="Court-fee data unavailable" />
      )}

      {rule && rule.status === 'unknown' && (
        <View style={styles.card}>
          <Badge text="Rates not sourced" tone="neutral" />
          <Text style={styles.cardTitle}>{rule.name}</Text>
          <Text style={styles.bodyText}>{rule.note}</Text>
          {rule.source_url && <SourceLink url={rule.source_url} />}
        </View>
      )}

      {rule && rule.status === 'ready' && (
        <>
          <Text style={styles.fieldLabel}>Claim amount (₹)</Text>
          <View style={styles.amountRow}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              value={amountText}
              onChangeText={setAmountText}
              placeholder="e.g. 100000"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              style={styles.amountInput}
              accessibilityLabel="Claim amount in rupees"
            />
          </View>

          <View style={styles.card}>
            {fee != null ? (
              <Text style={styles.feeValue}>₹ {formatINR(fee)}</Text>
            ) : (
              <Text style={styles.feeHint}>
                {amountText.trim() === ''
                  ? 'Enter a claim amount to estimate the fee.'
                  : 'Enter a valid positive amount.'}
              </Text>
            )}
            <View style={styles.badgeRow}>
              <Badge text={rule.name} tone="info" />
              <Badge text={rule.confidence} tone={confidenceTone(rule.confidence)} />
            </View>
            <Text style={styles.statute}>{rule.statute}</Text>
            <Text style={styles.bodyText}>{rule.basis}</Text>
            {rule.cap != null && (
              <Text style={styles.capText}>Capped at ₹ {formatINR(rule.cap)}</Text>
            )}
            {rule.note && <Text style={styles.noteText}>{rule.note}</Text>}
            <Text style={styles.asOf}>Rates as of {rule.as_of}</Text>
            {rule.source_url && <SourceLink url={rule.source_url} />}
          </View>
        </>
      )}
    </ScrollView>
  );
}

function SourceLink({ url }: { url: string }) {
  if (!url.startsWith('http')) {
    return <Text style={styles.asOf}>Source: {url}</Text>;
  }
  return (
    <Pressable
      onPress={() => Linking.openURL(url).catch(() => {})}
      accessibilityRole="link"
      style={styles.sourceRow}
    >
      <Text style={styles.sourceText}>🔗 Open source document</Text>
    </Pressable>
  );
}

/* --------------------------------- Limitation --------------------------------- */

function LimitationTab() {
  const db = useDatabase();
  const [entries, setEntries] = useState<LimitationEntry[]>([]);
  const [refs, setRefs] = useState<LimitationRef[]>([]);
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<'all' | 'suit' | 'appeal_application'>('all');
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [openRef, setOpenRef] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      listLimitationEntries(db).then((rows) => {
        if (mounted) setEntries(rows);
      });
      listLimitationRefs(db).then((rows) => {
        if (mounted) setRefs(rows);
      });
      return () => {
        mounted = false;
      };
    }, [db]),
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return entries.filter((e) => {
      if (kind !== 'all' && e.kind !== kind) return false;
      if (!needle) return true;
      return (
        e.label.toLowerCase().includes(needle) ||
        e.article.toLowerCase().includes(needle) ||
        e.accrual.toLowerCase().includes(needle) ||
        e.period.toLowerCase().includes(needle)
      );
    });
  }, [entries, q, kind]);

  const sections = refs.filter((r) => r.kind === 'section');
  const notes = refs.filter((r) => r.kind === 'note');

  return (
    <FlatList
      style={styles.list}
      data={filtered}
      keyExtractor={(e) => e.id.toString()}
      contentContainerStyle={styles.pane}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.headerBlock}>
          <View style={styles.intro}>
            <Text style={styles.introText}>
              Limitation periods from the Limitation Act, 1963 — how long you
              have to file a suit, appeal or application from the date the cause
              of action arises. Search by subject, article or trigger.
            </Text>
          </View>
          <View style={styles.warn}>
            <Text style={styles.warnText}>
              ⚠️ Computed deadlines assume the calendar rule (ss.3–4). If the
              last day is a holiday, the Limitation Act, 1963 ss.4–5 may extend
              it to the next working day — confirm with a lawyer.
            </Text>
          </View>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search e.g. contract, partition, fraud, rent…"
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            accessibilityLabel="Search limitation entries"
          />
          <View style={styles.chipRow}>
            <Chip label="All" active={kind === 'all'} onPress={() => setKind('all')} />
            <Chip
              label="Suits"
              active={kind === 'suit'}
              onPress={() => setKind('suit')}
            />
            <Chip
              label="Appeals & applications"
              active={kind === 'appeal_application'}
              onPress={() => setKind('appeal_application')}
            />
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <LimitationRow
          entry={item}
          expanded={openSlug === item.slug}
          onToggle={() => setOpenSlug((s) => (s === item.slug ? null : item.slug))}
        />
      )}
      ListEmptyComponent={<SectionListEmpty title="No matching entries" />}
      ListFooterComponent={
        <View style={styles.footer}>
          <Text style={styles.footerHead}>Limitation Act — key sections</Text>
          {sections.map((r) => (
            <RefRow
              key={r.id}
              refItem={r}
              expanded={openRef === `s-${r.id}`}
              onToggle={() =>
                setOpenRef((k) => (k === `s-${r.id}` ? null : `s-${r.id}`))
              }
            />
          ))}
          <Text style={styles.footerHead}>Scope & interpretation notes</Text>
          {notes.map((r) => (
            <RefRow
              key={r.id}
              refItem={r}
              expanded={openRef === `n-${r.id}`}
              onToggle={() =>
                setOpenRef((k) => (k === `n-${r.id}` ? null : `n-${r.id}`))
              }
            />
          ))}
        </View>
      }
    />
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      accessibilityRole="button"
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function LimitationRow({
  entry,
  expanded,
  onToggle,
}: {
  entry: LimitationEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [dateText, setDateText] = useState('');

  const deadline = useMemo(() => {
    const start = parseDateInput(dateText);
    if (!start) return null;
    const due = addPeriod(start, entry.period_value, entry.period_unit);
    return { due, days: daysUntil(due, today()) };
  }, [dateText, entry.period_value, entry.period_unit]);

  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} accessibilityRole="button">
        <View style={styles.rowHead}>
          <Text style={styles.article}>{entry.article}</Text>
          <Text style={styles.periodPill}>{entry.period}</Text>
        </View>
        <Text style={styles.entryLabel}>{entry.label}</Text>
        <View style={styles.badgeRow}>
          <Badge
            text={entry.kind === 'suit' ? 'Suit' : 'Appeal / Application'}
            tone={entry.kind === 'suit' ? 'info' : 'neutral'}
          />
          <Badge text={entry.court_type} tone="neutral" />
          <Badge text={entry.confidence} tone={confidenceTone(entry.confidence)} />
          <Text style={styles.expandHint}>{expanded ? '▾ Less' : '▸ More'}</Text>
        </View>
      </Pressable>

      {expanded && (
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Accrual (when time starts)</Text>
          <Text style={styles.bodyText}>{entry.accrual}</Text>

          {entry.exceptionsList.length > 0 && (
            <>
              <Text style={styles.detailLabel}>Exceptions & provisos</Text>
              {entry.exceptionsList.map((ex, i) => (
                <Text key={i} style={styles.bullet}>
                  • {ex}
                </Text>
              ))}
            </>
          )}

          {entry.relatedArticlesList.length > 0 && (
            <Text style={styles.related}>
              Related: {entry.relatedArticlesList.join(', ')}
            </Text>
          )}

          <Text style={styles.detailLabel}>Deadline calculator</Text>
          <View style={styles.amountRow}>
            <TextInput
              value={dateText}
              onChangeText={setDateText}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={colors.textMuted}
              style={styles.amountInput}
              keyboardType="numbers-and-punctuation"
              accessibilityLabel="Trigger date as DD/MM/YYYY"
            />
          </View>
          {deadline ? (
            <View style={styles.deadlineBox}>
              <Text style={styles.deadlineText}>
                Last day to file: {formatDate(deadline.due)}
              </Text>
              <Text
                style={[
                  styles.deadlineDays,
                  deadline.days >= 0 ? styles.deadlineOk : styles.deadlinePast,
                ]}
              >
                {deadline.days >= 0
                  ? `${deadline.days} day${deadline.days === 1 ? '' : 's'} remaining`
                  : `Limitation expired ${Math.abs(deadline.days)} day${Math.abs(deadline.days) === 1 ? '' : 's'} ago`}
              </Text>
            </View>
          ) : (
            <Text style={styles.hintText}>
              Enter the trigger date as DD/MM/YYYY to compute the last day.
            </Text>
          )}

          {entry.source_url && <SourceLink url={entry.source_url} />}
          {!entry.source_url && entry.source_secondary && (
            <Text style={styles.asOf}>
              Source: {entry.source_secondary} · verified {entry.as_of}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

function RefRow({
  refItem,
  expanded,
  onToggle,
}: {
  refItem: LimitationRef;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={styles.refCard}>
      <Pressable onPress={onToggle} style={styles.refHead} accessibilityRole="button">
        <Text style={styles.refTitle}>{refItem.title}</Text>
        <Text style={styles.expandHint}>{expanded ? '▾' : '▸'}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.refBody}>
          <Text style={styles.bodyText}>{refItem.body}</Text>
          {refItem.exceptionsList?.map((ex, i) => (
            <Text key={i} style={styles.bullet}>
              • {ex}
            </Text>
          ))}
          <Text style={styles.asOf}>
            Confidence: {refItem.confidence} · as of {refItem.as_of}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.navy900,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: colors.navy800,
  },
  tabButtonActive: { backgroundColor: colors.gold },
  tabLabel: { color: colors.textSecondary, fontWeight: '700', fontSize: 14 },
  tabLabelActive: { color: colors.navy950 },
  pane: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  list: { flex: 1, backgroundColor: colors.navy950 },
  headerBlock: { gap: spacing.md, marginBottom: spacing.sm },
  intro: {
    backgroundColor: colors.infoBg,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  introText: { color: colors.info, fontSize: 13, lineHeight: 19 },
  warn: {
    backgroundColor: colors.dangerBg,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  warnText: { color: colors.danger, fontSize: 12.5, lineHeight: 18 },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: spacing.xs,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  selectText: { color: colors.text, fontSize: 15, fontWeight: '600' },
  selectCaret: { color: colors.gold, fontSize: 15 },
  picker: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  pickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.cardBorder,
  },
  pickRowActive: { backgroundColor: colors.navy800 },
  pickRowText: { color: colors.text, fontSize: 14 },
  pickRowTextActive: { color: colors.gold, fontWeight: '700' },
  pickUnknown: { color: colors.textMuted, fontSize: 11 },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, alignItems: 'center' },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  rupee: { color: colors.gold, fontSize: 18, fontWeight: '800', marginRight: spacing.sm },
  amountInput: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
    paddingVertical: spacing.md,
  },
  feeValue: { color: colors.gold, fontSize: 32, fontWeight: '800' },
  feeHint: { color: colors.textSecondary, fontSize: 14 },
  statute: { color: colors.text, fontSize: 14, fontWeight: '700' },
  bodyText: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  capText: { color: colors.saffron, fontSize: 13, fontWeight: '600' },
  noteText: { color: colors.textMuted, fontSize: 12.5, lineHeight: 18, fontStyle: 'italic' },
  asOf: { color: colors.textMuted, fontSize: 11.5 },
  sourceRow: { paddingVertical: spacing.xs },
  sourceText: { color: colors.info, fontSize: 13, fontWeight: '600' },
  searchInput: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  chipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipText: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '600' },
  chipTextActive: { color: colors.navy950 },
  rowHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  article: { color: colors.gold, fontSize: 14, fontWeight: '800' },
  periodPill: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: colors.navy700,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  entryLabel: { color: colors.text, fontSize: 15, fontWeight: '700', lineHeight: 21 },
  expandHint: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  detail: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.cardBorder,
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: spacing.sm,
  },
  bullet: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  related: { color: colors.info, fontSize: 12.5, marginTop: spacing.xs },
  deadlineBox: {
    backgroundColor: colors.navy800,
    borderRadius: radius.sm,
    padding: spacing.md,
    gap: 4,
    marginTop: spacing.xs,
  },
  deadlineText: { color: colors.text, fontSize: 15, fontWeight: '700' },
  deadlineDays: { fontSize: 13, fontWeight: '600' },
  deadlineOk: { color: colors.success },
  deadlinePast: { color: colors.danger },
  hintText: { color: colors.textMuted, fontSize: 12.5, lineHeight: 18 },
  footer: { gap: spacing.sm, marginTop: spacing.lg },
  footerHead: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: spacing.sm,
  },
  refCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  refHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  refTitle: { color: colors.text, fontSize: 14, fontWeight: '700', flex: 1 },
  refBody: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
});
