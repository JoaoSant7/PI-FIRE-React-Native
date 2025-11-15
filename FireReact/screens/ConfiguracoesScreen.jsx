// screens/ConfiguracoesScreen.jsx
import React from "react";
import { StyleSheet, Text, View, Switch, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import { useSettings } from "../contexts/SettingsContext";
import { useTheme } from "../contexts/ThemeContext";

export default function ConfiguracoesScreen() {
  const { settings, updateSetting, loading } = useSettings();
  const { colors } = useTheme();

  if (loading || !settings) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Estilo dinâmico para o modo escuro
  const containerStyle = [
    styles.container,
    { backgroundColor: colors.background }
  ];

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: colors.background }]}>
      <SafeAreaView style={containerStyle}>
        <Text style={[styles.title, { color: colors.primary }]}>Configurações</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, borderBottomColor: colors.divider }]}>Notificações</Text>
          <View style={[styles.switchContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.switchText, { color: colors.text }]}>Notificações Gerais</Text>
            <Switch
              onValueChange={v => updateSetting('notifications', v)}
              value={settings.notifications}
              trackColor={{ false: colors.switchTrackInactive, true: colors.primaryLight }}
              thumbColor={settings.notifications ? colors.primary : colors.switchThumbInactive}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, borderBottomColor: colors.divider }]}>Aparência</Text>
          <View style={[styles.switchContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.switchText, { color: colors.text }]}>Modo Escuro</Text>
            <Switch
              onValueChange={v => updateSetting('darkMode', v)}
              value={settings.darkMode}
              trackColor={{ false: colors.switchTrackInactive, true: colors.primaryLight }}
              thumbColor={settings.darkMode ? colors.primary : colors.switchThumbInactive}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, borderBottomColor: colors.divider }]}>Som e Feedback</Text>
          <View style={[styles.switchContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.switchText, { color: colors.text }]}>Som de Notificações</Text>
            <Switch
              onValueChange={v => updateSetting('sound', v)}
              value={settings.sound}
              trackColor={{ false: colors.switchTrackInactive, true: colors.primaryLight }}
              thumbColor={settings.sound ? colors.primary : colors.switchThumbInactive}
            />
          </View>
          <View style={[styles.switchContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.switchText, { color: colors.text }]}>Vibração</Text>
            <Switch
              onValueChange={v => updateSetting('vibration', v)}
              value={settings.vibration}
              trackColor={{ false: colors.switchTrackInactive, true: colors.primaryLight }}
              thumbColor={settings.vibration ? colors.primary : colors.switchThumbInactive}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  switchText: { fontSize: 16 },
});