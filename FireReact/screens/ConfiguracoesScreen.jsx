// screens/ConfiguracoesScreen.jsx
import React from "react";
import {
  Text,
  View,
  Switch,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSettings } from "../contexts/SettingsContext";

// Import dos estilos
import styles from "../styles/ConfiguracoesStyles";

export default function ConfiguracoesScreen() {
  const { settings, updateSetting, loading } = useSettings();

  if (loading || !settings) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#bc010c" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Notificações Gerais</Text>
            <Switch
              onValueChange={(v) => updateSetting("notifications", v)}
              value={settings.notifications}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Modo Escuro</Text>
            <Switch
              onValueChange={(v) => updateSetting("darkMode", v)}
              value={settings.darkMode}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Som e Feedback</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Som de Notificações</Text>
            <Switch
              onValueChange={(v) => updateSetting("sound", v)}
              value={settings.sound}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Vibração</Text>
            <Switch
              onValueChange={(v) => updateSetting("vibration", v)}
              value={settings.vibration}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
