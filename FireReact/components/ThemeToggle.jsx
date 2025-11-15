// components/ThemeToggle.js
import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Modo Escuro</Text>
        <Text style={styles.subtitle}>
          {isDark ? 'Ativado' : 'Desativado'} - {isDark ? 'Melhor para uso noturno' : 'Melhor para uso diurno'}
        </Text>
      </View>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: colors.switchTrackInactive, true: colors.primaryLight }}
        thumbColor={isDark ? colors.primary : colors.switchThumbInactive}
      />
    </View>
  );
};

export default ThemeToggle;