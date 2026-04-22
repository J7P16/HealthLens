import React, { useState, useEffect } from "react";
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
  Image,
} from "react-native";
import { useUser } from "@/src/hooks/authHooks";
import { getUserImages } from "@/src/hooks/imageHooks";
 
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
  imageUri?: string;
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
  return (
    <View style={styles.diagCard}>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.diagImage} resizeMode="cover" />
      ) : (
        <View style={styles.diagIconBox}>
          <Text style={styles.diagIconText}>🔬</Text>
        </View>
      )}
      <Text style={styles.diagTitle}>{item.title}</Text>
      <Text style={styles.diagDate}>📅 {item.date}</Text>
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
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { user: firebaseUser, profile, loading } = useUser();
 
  useEffect(() => {
    if (!firebaseUser) return;
    getUserImages(firebaseUser.uid).then((images) => {
      setDiagnoses(
        images.map((img) => ({
          id:         img.id,
          title:      "Skin Scan",
          date:       img.createdAt?.toDate().toLocaleDateString("en-US", {
            month: "short",
            day:   "numeric",
            year:  "numeric",
          }) ?? "",
          confidence: 0,
          severity:   "None" as Severity,
          tag:        "Collect",
          tagColor:   "#5187DD",
          imageUri:   img.uri,
        }))
      );
    });
  }, [firebaseUser]);
 
  if (loading || !profile) return <ActivityIndicator style={{ flex: 1 }} />;
 
  const achievements: Achievement[] = [];
 
  const user: UserProfile = {
    name:        profile.name,
    subtitle:    `${profile.gender} · ${profile.age} yrs`,
    email:       profile.email,
    memberSince: profile.createdAt?.toDate().toLocaleDateString("en-US", {
      month: "short",
      year:  "numeric",
    }),
  };
 
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
 
      {/* Content card */}
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
 
        {/* Diagnoses — 2 column grid */}
        {activeTab === "scans" && (
          <FlatList<Diagnosis>
            data={diagnoses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DiagnosisCard item={item} />}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrap}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No scans yet</Text>
              </View>
            }
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
 
  /* Diagnoses grid */
  listContent: { padding: "4%", gap: 10 },
  columnWrap:  { gap: 10 },
  diagCard: {
    flex: 1,
    backgroundColor: BG,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    gap: 8,
    ...cardShadow,
    shadowRadius: 8,
    shadowOpacity: 0.4,
  },
  diagImage: {
    width: "100%",
    height: 120,
    borderRadius: 14,
  },
  diagIconBox: {
    width: "100%",
    height: 120,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  diagIconText: { fontSize: 32 },
  diagTitle: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: "600",
    color: "#1E2A3A",
    textAlign: "center",
  },
  diagDate: {
    fontFamily: FONT,
    fontSize: 10,
    color: "#9C9C9C",
    textAlign: "center",
  },
 
  /* Empty state */
  emptyState: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: {
    fontFamily: FONT,
    fontSize: 14,
    color: "#9C9C9C",
  },
 
  /* Achievements */
  achieveGrid: { padding: "4%", flexDirection: "row", flexWrap: "wrap", gap: 12 },
  achievement: { width: "47%", borderRadius: 20, padding: "5%", gap: 4 },
  achieveIcon: { fontSize: 22, marginBottom: 4 },
  achieveTitle: { fontFamily: FONT, fontSize: 13, fontWeight: "700", color: "#fff" },
  achieveSub: { fontFamily: FONT, fontSize: 11, color: "rgba(255,255,255,0.85)" },
});
