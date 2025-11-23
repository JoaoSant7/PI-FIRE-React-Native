import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../utils/fontSizes";

/**
 * Função que cria estilos dinâmicos baseados na escala de fonte
 */
export const createUsuarioStyles = (scaleFont) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContent: {
      flex: 1,
    },
    userInfoHeader: {
      alignItems: 'center',
      paddingVertical: 30,
      backgroundColor: '#f8f8f8',
      marginTop: 60,
    },
    userName: {
      fontSize: scaleFont(FONT_SIZES.xxl),
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    userRank: {
      fontSize: scaleFont(FONT_SIZES.base),
      color: '#666',
      fontWeight: '500',
    },
    section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
      fontSize: scaleFont(FONT_SIZES.lg),
      fontWeight: 'bold',
      color: '#bc010c',
      marginBottom: 15,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f8f8f8',
    },
    infoLabel: {
      fontSize: scaleFont(FONT_SIZES.md),
      fontWeight: '600',
      color: '#666',
    },
    infoValue: {
      fontSize: scaleFont(FONT_SIZES.md),
      color: '#333',
      fontWeight: '500',
      textAlign: 'right',
    },
    logoutSection: {
      padding: 20,
      marginTop: 20,
    },
    logoutButton: {
      backgroundColor: '#bc010c',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: '#fff',
      fontSize: scaleFont(FONT_SIZES.base),
      fontWeight: 'bold',
    },
  });
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
  },
  userInfoHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
    marginTop: 60,
  },
  userName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userRank: {
    fontSize: FONT_SIZES.base,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#bc010c',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
  },
  logoutSection: {
    padding: 20,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#bc010c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
  },
});

export default styles;