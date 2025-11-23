// styles/DashboardStyles.js
import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../utils/fontSizes";

/**
 * Função que cria estilos dinâmicos baseados na escala de fonte
 */
export const createDashboardStyles = (scaleFont) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f3f4f6",
    },
    header: {
      backgroundColor: "#fff",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: scaleFont(FONT_SIZES.xxl),
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
    },
    syncButton: {
      position: "absolute",
      right: 0,
    },
    subtitle: {
      marginTop: 8,
      fontSize: scaleFont(FONT_SIZES.md),
      color: "#666",
      textAlign: "center",
    },
    errorBanner: {
      marginTop: 10,
      padding: 8,
      backgroundColor: "#e53935",
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      color: "#fff",
      marginLeft: 8,
      flex: 1,
    },
    syncInfo: {
      marginTop: 6,
      flexDirection: "row",
      justifyContent: "center",
    },
    syncText: {
      marginLeft: 6,
      color: "#666",
      fontSize: scaleFont(FONT_SIZES.sm),
    },
    section: {
      backgroundColor: "#fff",
      margin: 16,
      padding: 16,
      borderRadius: 10,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: scaleFont(FONT_SIZES.xl),
      fontWeight: "600",
      color: "#333",
      marginBottom: 16,
      textAlign: "center",
    },
    statsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    statItem: {
      width: "48%",
      backgroundColor: "#f8f9fa",
      padding: 14,
      borderRadius: 8,
      marginBottom: 12,
      alignItems: "center",
    },
    fullWidth: {
      width: "100%",
    },
    statValue: {
      fontSize: scaleFont(FONT_SIZES.huge),
      fontWeight: "bold",
      color: "#1e293b",
    },
    statLabel: {
      fontSize: scaleFont(FONT_SIZES.sm),
      color: "#666",
      marginTop: 4,
      textAlign: "center",
    },
    rowPercent: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    percentBox: {
      width: "48%",
      backgroundColor: "#f8f9fa",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    percentValue: {
      fontSize: scaleFont(FONT_SIZES.huge),
      fontWeight: "bold",
    },
    percentLabel: {
      marginTop: 6,
      fontSize: scaleFont(FONT_SIZES.md),
      color: "#555",
    },
    chartSection: {
      marginBottom: 24,
    },
    chartTitle: {
      fontSize: scaleFont(FONT_SIZES.lg),
      fontWeight: "600",
      color: "#333",
      marginBottom: 12,
      textAlign: "center",
    },
    centeredChart: {
      alignItems: "center",
      justifyContent: "center",
    },
    infoSection: {
      margin: 16,
      padding: 12,
      backgroundColor: "#e3f2fd",
      borderRadius: 8,
    },
    infoText: {
      textAlign: "center",
      color: "#1e88e5",
      fontSize: scaleFont(FONT_SIZES.smMd),
    },
  });
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  syncButton: {
    position: "absolute",
    right: 0,
  },
  subtitle: {
    marginTop: 8,
    fontSize: FONT_SIZES.md,
    color: "#666",
    textAlign: "center",
  },
  errorBanner: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#e53935",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "#fff",
    marginLeft: 8,
    flex: 1,
  },
  syncInfo: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
  syncText: {
    marginLeft: 6,
    color: "#666",
    fontSize: FONT_SIZES.sm,
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
  },
  statValue: {
    fontSize: FONT_SIZES.huge,
    fontWeight: "bold",
    color: "#1e293b",
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  rowPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percentBox: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  percentValue: {
    fontSize: FONT_SIZES.huge,
    fontWeight: "bold",
  },
  percentLabel: {
    marginTop: 6,
    fontSize: FONT_SIZES.md,
    color: "#555",
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  centeredChart: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoSection: {
    margin: 16,
    padding: 12,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
  },
  infoText: {
    textAlign: "center",
    color: "#1e88e5",
    fontSize: FONT_SIZES.smMd,
  },
});
