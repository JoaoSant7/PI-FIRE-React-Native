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
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 30,
      paddingTop: 40,
      paddingBottom: 40,
      minHeight: "100%",
    },
    header: {
      alignItems: "center",
      marginBottom: 50,
    },
    fireTitle: {
      fontSize: scaleFont(FONT_SIZES.mega),
      fontWeight: "800",
      color: "#bc010c",
      textAlign: "center",
      marginBottom: 10,
      textShadowColor: "rgba(188, 1, 12, 0.1)",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
    },
    logo: {
      width: 160,
      height: 160,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: scaleFont(FONT_SIZES.md),
      color: "#666",
      textAlign: "center",
      lineHeight: 20,
      paddingHorizontal: 10,
    },
    formContainer: {
      width: "100%",
    },
    inputWrapper: {
      marginBottom: 20,
    },
    label: {
      fontSize: scaleFont(FONT_SIZES.sm),
      fontWeight: "700",
      color: "#333",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    input: {
      backgroundColor: "#f8f8f8",
      borderWidth: 1.5,
      borderColor: "#e1e1e1",
      borderRadius: 12,
      paddingHorizontal: 18,
      paddingVertical: 16,
      fontSize: scaleFont(FONT_SIZES.base),
      color: "#333",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    forgotPasswordButton: {
      alignSelf: "flex-end",
      marginBottom: 30,
      paddingVertical: 5,
    },
    forgotPasswordText: {
      color: "#bc010c",
      fontSize: scaleFont(FONT_SIZES.md),
      fontWeight: "600",
      textDecorationLine: "underline",
    },
    loginButton: {
      backgroundColor: "#bc010c",
      paddingVertical: 18,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "#bc010c",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8,
      borderWidth: 1,
      borderColor: "#a0010a",
    },
    loginButtonDisabled: {
      backgroundColor: "#cccccc",
      shadowColor: "#cccccc",
      borderColor: "#bbbbbb",
    },
    loginButtonText: {
      color: "white",
      fontSize: scaleFont(FONT_SIZES.base),
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
  });
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
    minHeight: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  fireTitle: {
    fontSize: FONT_SIZES.mega,
    fontWeight: "800",
    color: "#bc010c",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(188, 1, 12, 0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1.5,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: FONT_SIZES.base,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 30,
    paddingVertical: 5,
  },
  forgotPasswordText: {
    color: "#bc010c",
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#bc010c",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#bc010c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#a0010a",
  },
  loginButtonDisabled: {
    backgroundColor: "#cccccc",
    shadowColor: "#cccccc",
    borderColor: "#bbbbbb",
  },
  loginButtonText: {
    color: "white",
    fontSize: FONT_SIZES.base,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default styles;