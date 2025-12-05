import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../utils/fontSizes";

/**
 * Função que cria estilos dinâmicos baseados na escala de fonte
 */
export const createLoginStyles = (scaleFont) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: scaleFont(FONT_SIZES.mega),
      fontWeight: "bold",
      marginBottom: 900,
      textAlign: "center",
      color: "#bc010c",
    },
    subtitle: {
      fontSize: scaleFont(FONT_SIZES.md),
      marginBottom: 40,
      textAlign: "center",
      color: "#666",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      fontSize: scaleFont(FONT_SIZES.base),
      backgroundColor: "#f9f9f9",
    },
    button: {
      backgroundColor: "#bc010c",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
      minHeight: 50,
      justifyContent: "center",
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonText: {
      color: "#fff",
      fontSize: scaleFont(FONT_SIZES.base),
      fontWeight: "bold",
    },
    forgotPassword: {
      marginTop: 20,
      alignItems: "center",
    },
    forgotPasswordText: {
      color: "#bc010c",
      fontSize: scaleFont(FONT_SIZES.sm),
    },
  });
};

// Estilos estáticos (sem escala de fonte)
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: FONT_SIZES.mega,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#bc010c",
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    marginBottom: 40,
    textAlign: "center",
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: FONT_SIZES.base,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#bc010c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    minHeight: 50,
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: FONT_SIZES.base,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#bc010c",
    fontSize: FONT_SIZES.base,
  },
});

export default styles;