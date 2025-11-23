import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../utils/fontSizes";

/**
 * Função que cria estilos dinâmicos baseados na escala de fonte
 */
export const createOcorrenciaRegistradaStyles = (scaleFont) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 20,
    },
    content: {
      alignItems: "center",
      paddingVertical: 40,
    },
    successIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#28a745",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    checkmark: {
      color: "white",
      fontSize: scaleFont(FONT_SIZES.mega),
      fontWeight: "bold",
    },
    successTitle: {
      fontSize: scaleFont(FONT_SIZES.xxxl),
      fontWeight: "bold",
      color: "#28a745",
      textAlign: "center",
      marginBottom: 10,
    },
    successMessage: {
      fontSize: scaleFont(FONT_SIZES.base),
      color: "#6c757d",
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 22,
    },
    buttonContainer: {
      width: "100%",
      gap: 15,
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    primaryButton: {
      backgroundColor: "#6c757d",
    },
    secondaryButton: {
      backgroundColor: "#E6A400",
    },
    accentButton: {
      backgroundColor: "#BC010C",
    },
    pdfButton: {
      backgroundColor: "#28a745",
    },
    buttonText: {
      color: "white",
      fontSize: scaleFont(FONT_SIZES.base),
      fontWeight: "600",
    },
  });
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    paddingVertical: 40,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    color: "white",
    fontSize: FONT_SIZES.mega,
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: FONT_SIZES.base,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: "#6c757d",
  },
  secondaryButton: {
    backgroundColor: "#E6A400",
  },
  accentButton: {
    backgroundColor: "#BC010C",
  },
  pdfButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "white",
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
  },
});

export default styles;