import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../utils/fontSizes";

/**
 * Função que cria estilos dinâmicos baseados na escala de fonte
 */
export const createHomeStyles = (scaleFont) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: scaleFont(FONT_SIZES.xxl),
      fontWeight: "600",
      color: "#BC010C",
      marginBottom: 40,
      textAlign: "center",
    },
    buttonsContainer: {
      width: "100%",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 16,
    },
    button: {
      width: "48%",
      height: 140,
      borderRadius: 16,
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    buttonContent: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    dashboard: {
      backgroundColor: "#3E4095",
    },
    listar: {
      backgroundColor: "#E6A400",
    },
    registrar: {
      backgroundColor: "#BC010C",
    },
    localizacao: {
      backgroundColor: "#4CAF50",
    },
    buttonText: {
      color: "white",
      fontSize: scaleFont(FONT_SIZES.md),
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      textAlign: "center",
      marginTop: 12,
    },
  });
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "600",
    color: "#BC010C",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  button: {
    width: "48%",
    height: 140,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  dashboard: {
    backgroundColor: "#3E4095",
  },
  listar: {
    backgroundColor: "#E6A400",
  },
  registrar: {
    backgroundColor: "#BC010C",
  },
  localizacao: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 12,
  },
});

export default styles;