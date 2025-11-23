import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../utils/fontSizes";

/**
 * Função que cria estilos dinâmicos baseados na escala de fonte
 * @param {Function} scaleFont - Função para escalar tamanhos de fonte
 * @returns {Object} StyleSheet com tamanhos de fonte escalados
 */
export const createConfiguracoesStyles = (scaleFont) => {
  return StyleSheet.create({
    scrollView: { 
      flex: 1, 
      backgroundColor: "#fff" 
    },
    container: { 
      flex: 1, 
      padding: 20 
    },
    title: {
      fontSize: scaleFont(FONT_SIZES.xxxl), // 24px escalado
      fontWeight: "bold",
      color: "#bc010c",
      marginBottom: 30,
      textAlign: "center",
    },
    section: { 
      marginBottom: 25 
    },
    sectionTitle: {
      fontSize: scaleFont(FONT_SIZES.lg), // 18px escalado
      fontWeight: "600",
      color: "#333",
      marginBottom: 15,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: 12,
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      marginBottom: 10,
    },
    switchText: { 
      fontSize: scaleFont(FONT_SIZES.base), // 16px escalado
      color: "#333" 
    },
    fontSizeContainer: {
      width: "100%",
      padding: 12,
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      marginBottom: 10,
    },
    fontSizeButtonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      gap: 8,
    },
    fontSizeButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 2,
    },
    fontSizeButtonSelected: {
      backgroundColor: "#bc010c",
      borderColor: "#bc010c",
    },
    fontSizeButtonUnselected: {
      backgroundColor: "#f8f8f8",
      borderColor: "#ccc",
    },
    fontSizeButtonText: {
      fontSize: scaleFont(FONT_SIZES.smMd), // 13px escalado
      fontWeight: "bold",
    },
    fontSizeButtonTextSelected: {
      color: "white",
    },
    fontSizeButtonTextUnselected: {
      color: "#666",
    },
  });
};

// Função auxiliar que retorna estilos sem escala (compatibilidade)
export const styles = StyleSheet.create({
  scrollView: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  container: { 
    flex: 1, 
    padding: 20 
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: "bold",
    color: "#bc010c",
    marginBottom: 30,
    textAlign: "center",
  },
  section: { 
    marginBottom: 25 
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  switchText: { 
    fontSize: FONT_SIZES.base,
    color: "#333" 
  },
  fontSizeContainer: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  fontSizeButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    gap: 8,
  },
  fontSizeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
  },
  fontSizeButtonSelected: {
    backgroundColor: "#bc010c",
    borderColor: "#bc010c",
  },
  fontSizeButtonUnselected: {
    backgroundColor: "#f8f8f8",
    borderColor: "#ccc",
  },
  fontSizeButtonText: {
    fontSize: FONT_SIZES.smMd,
    fontWeight: "bold",
  },
  fontSizeButtonTextSelected: {
    color: "white",
  },
  fontSizeButtonTextUnselected: {
    color: "#666",
  },
});

export default styles;