// styles/EditarOcorrenciaStyles.js
import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../utils/fontSizes";

/**
 * Função que cria estilos dinâmicos baseados na escala de fonte
 */
export const createEditarOcorrenciaStyles = (scaleFont) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    scrollView: {
      flex: 1,
    },
    header: {
      backgroundColor: "#fff",
      padding: 24,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
      marginBottom: 8,
    },
    title: {
      fontSize: scaleFont(FONT_SIZES.xxl),
      fontWeight: "bold",
      color: "#333",
      marginTop: 12,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: scaleFont(FONT_SIZES.xs),
      color: "#888",
      fontFamily: "monospace",
    },
    form: {
      padding: 20,
    },
    fieldContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: scaleFont(FONT_SIZES.base),
      fontWeight: "600",
      color: "#333",
      marginBottom: 8,
    },
    required: {
      color: "#bc010c",
      fontSize: scaleFont(FONT_SIZES.base),
    },
    input: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 14,
      fontSize: scaleFont(FONT_SIZES.base),
      color: "#333",
    },
    textArea: {
      minHeight: 120,
      textAlignVertical: "top",
      paddingTop: 14,
    },
    hint: {
      fontSize: scaleFont(FONT_SIZES.xs),
      color: "#888",
      marginTop: 4,
      fontStyle: "italic",
    },
    infoBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      padding: 12,
      borderRadius: 8,
      marginBottom: 20,
      gap: 8,
    },
    infoText: {
      fontSize: scaleFont(FONT_SIZES.xs),
      color: "#666",
      flex: 1,
    },
    saveButton: {
      backgroundColor: "#bc010c",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      borderRadius: 8,
      marginTop: 12,
      gap: 8,
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      opacity: 0.6,
    },
    saveButtonText: {
      color: "#fff",
      fontSize: scaleFont(FONT_SIZES.base),
      fontWeight: "600",
    },
    cancelButton: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 8,
      marginTop: 12,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    cancelButtonText: {
      color: "#666",
      fontSize: scaleFont(FONT_SIZES.base),
      fontWeight: "600",
      textAlign: "center",
    },
  });
};

// Estilos estáticos (para compatibilidade)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 8,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.xs,
    color: "#888",
    fontFamily: "monospace",
  },
  form: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#bc010c",
    fontSize: FONT_SIZES.base,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    fontSize: FONT_SIZES.base,
    color: "#333",
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
    paddingTop: 14,
  },
  hint: {
    fontSize: FONT_SIZES.xs,
    color: "#888",
    marginTop: 4,
    fontStyle: "italic",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  infoText: {
    fontSize: FONT_SIZES.xs,
    color: "#666",
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#bc010c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default styles;