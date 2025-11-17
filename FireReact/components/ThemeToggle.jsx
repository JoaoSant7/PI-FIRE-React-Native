// components/ThemeToggle.js
import React from 'react';
import { Switch, View, StyleSheet } from 'react-native';
import ScaledText from './ScaledText';
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
        <ScaledText style={styles.title}>Modo Escuro</ScaledText>
        <ScaledText style={styles.subtitle}>
          {isDark ? 'Ativado' : 'Desativado'} - {isDark ? 'Melhor para uso noturno' : 'Melhor para uso diurno'}
        </ScaledText>
      </View>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: colors.primaryLight }}
        thumbColor={isDark ? colors.primary : '#f4f3f4'}
      />
    </View>
  );
};

export default ThemeToggle;