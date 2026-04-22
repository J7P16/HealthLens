import React, { useState } from "react";
import * as Typography from "@/src/theme/tokens/typography";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useUser } from "@/src/hooks/authHooks";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Severity = "None" | "Low" | "Medium" | "High";

export interface Diagnosis {
  id: string;
  title: string;
  date: string;
  confidence: number;
  severity: Severity;
  tag: string;
  tagColor: string;
}

export interface Achievement {
  id: string;
  title: string;
  sub: string;
  bg: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  subtitle: string;
  email: string;
  memberSince: string;
}

type Tab = "scans" | "achievements";

interface ProfileScreenProps {
  user: UserProfile;
  diagnoses: Diagnosis[];
  achievements: Achievement[];
}

const SEVERITY_COLORS: Record<Severity, string> = {
  None:   "#4CAF50",
  Low:    "#4CAF50",
  Medium: "#FF9800",
  High:   "#F44336",
};

// ─── Constants ───────────────────────────────────────────────────────────────

const FONT = Typography.typography.fontFamily.regular;
const BLUE = "#56A4E0CC";
const BG   = "#EEF2F7";

const cardShadow = {
  shadowColor:   "#93A0BA",
  shadowRadius:  20,
  shadowOpacity: 1,
  shadowOffset:  { width: 0, height: 0 },
  elevation:     6,
} as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

function DiagnosisCard({ item }: { item: Diagnosis }): React.JSX.Element {
  const sevColor = SEVERITY_COLORS[item.severity];
  return (
    <View style={styles.diagCard}>
      <View style={styles.diagIconBox}>
        <Text style={styles.diagIconText}>🔬</Text>
      </View>
      <View style={styles.diagInfo}>
        <Text style={styles.diagTitle}>{item.title}</Text>
        <Text style={styles.diagDate}>📅 {item.date}</Text>
        <View style={styles.diagMeta}>
          <Text style={styles.diagConf}>Confidence: {item.confidence}%</Text>
          <View style={[styles.severityPill, { backgroundColor: sevColor + "22" }]}>
            <Text style={[styles.severityText, { color: sevColor }]}>{item.severity}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.tagPill, { backgroundColor: item.tagColor }]}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
    </View>
  );
}

function AchievementBadge({ item }: { item: Achievement }): React.JSX.Element {
  return (
    <View style={[styles.achievement, { backgroundColor: item.bg }]}>
      <Text style={styles.achieveIcon}>{item.icon}</Text>
      <Text style={styles.achieveTitle}>{item.title}</Text>
      <Text style={styles.achieveSub}>{item.sub}</Text>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────


export default function ProfileScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>("scans");
  const { profile, loading } = useUser();

  if (loading || !profile) return <ActivityIndicator style={{ flex: 1 }} />;

  const user: UserProfile = {
    name:        profile.name,
    subtitle:    `${profile.gender} · ${profile.age} yrs`,
    email:       profile.email,
    memberSince: profile.createdAt?.toDate().toLocaleDateString("en-US", {
      month: "short",
      year:  "numeric",
    }),
  };
   const diagnoses: Diagnosis[]     = [];
  const achievements: Achievement[] = [];
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtitle}>{user.subtitle}</Text>
          <View style={styles.headerMeta}>
            <Text style={styles.metaText}>✉️  {user.email}</Text>
            <Text style={styles.metaText}>📅  Member since {user.memberSince}</Text>
          </View>
        </View>
      </View>

      {/* Content card — fills the rest of the screen */}
      <View style={styles.contentCard}>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(["scans", "achievements"] as Tab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === "scans" ? "Recent Scans" : "Achievements"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Diagnoses — scrollable, fills available space */}
        {activeTab === "scans" && (
          <FlatList<Diagnosis>
            data={diagnoses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DiagnosisCard item={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Achievements grid */}
        {activeTab === "achievements" && (
          <ScrollView
            contentContainerStyle={styles.achieveGrid}
            showsVerticalScrollIndicator={false}
          >
            {achievements.map((item) => (
              <AchievementBadge key={item.id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  /* Header */
  header: {
    backgroundColor: BLUE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingTop: "5%",
    paddingBottom: "7%",
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.6)",
  },
  headerInfo: { flex: 1, gap: 2 },
  name: {
    fontFamily: FONT,
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: FONT,
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 6,
  },
  headerMeta: { gap: 3 },
  metaText: {
    fontFamily: FONT,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },

  /* Content card */
  contentCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginTop: -20,
    ...cardShadow,
    overflow: "hidden",
  },

  /* Tabs */
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: "4%",
    paddingTop: "4%",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: BG,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2.5,
    borderBottomColor: "transparent",
    marginBottom: -1,
  },
  tabActive: { borderBottomColor: BLUE },
  tabText: {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: "500",
    color: "#9C9C9C",
  },
  tabTextActive: { color: BLUE, fontWeight: "700" },

  /* Diagnoses */
  listContent: { padding: "4%", gap: 10 },
  diagCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BG,
    borderRadius: 20,
    padding: "3.5%",
    gap: 12,
  },
  diagIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...cardShadow,
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  diagIconText: { fontSize: 20 },
  diagInfo: { flex: 1, gap: 3 },
  diagTitle: {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: "600",
    color: "#1E2A3A",
  },
  diagDate: { fontFamily: FONT, fontSize: 11, color: "#9C9C9C" },
  diagMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 },
  diagConf: { fontFamily: FONT, fontSize: 11, color: "#6B7A8D" },
  severityPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 30 },
  severityText: { fontFamily: FONT, fontSize: 10, fontWeight: "600" },
  tagPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 30 },
  tagText: { fontFamily: FONT, fontSize: 10, fontWeight: "700", color: "#fff" },

  /* Achievements */
  achieveGrid: { padding: "4%", flexDirection: "row", flexWrap: "wrap", gap: 12 },
  achievement: { width: "47%", borderRadius: 20, padding: "5%", gap: 4 },
  achieveIcon: { fontSize: 22, marginBottom: 4 },
  achieveTitle: { fontFamily: FONT, fontSize: 13, fontWeight: "700", color: "#fff" },
  achieveSub: { fontFamily: FONT, fontSize: 11, color: "rgba(255,255,255,0.85)" },
});
