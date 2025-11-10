// contexts/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cores específicas para aplicativo de emergência
const lightColors = {
  // Cores primárias (vermelho dos bombeiros)
  primary: '#D32F2F',
  primaryDark: '#B71C1C',
  primaryLight: '#FF6659',
  
  // Cores de fundo
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  
  // Cores de texto
  text: '#212121',
  textSecondary: '#757575',
  textOnPrimary: '#FFFFFF',
  
  // Cores de estado
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Cores de elementos UI
  border: '#E0E0E0',
  divider: '#EEEEEE',
  backdrop: 'rgba(0,0,0,0.5)',
};

const darkColors = {
  // Cores primárias (mantém o vermelho mas ajusta tons)
  primary: '#BC010C',
  primaryDark: '#D32F2F',
  primaryLight: '#BC010C',
  
  // Cores de fundo
  background: '#121212',
  surface: '#1E1E1E',
  card: '#252525',
  
  // Cores de texto
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textOnPrimary: '#FFFFFF',
  
  // Cores de estado
  success: '#66BB6A',
  warning: '#FFB74D',
  error: '#EF5350',
  info: '#64B5F6',
  
  // Cores de elementos UI
  border: '#333333',
  divider: '#383838',
  backdrop: 'rgba(255,255,255,0.1)',
};

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === 'dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadStoredTheme();
  }, []);

  const loadStoredTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem('bombeiros_theme');
      if (stored !== null) {
        setIsDark(stored === 'dark');
      } else {
        // Seguir o tema do sistema por padrão
        setIsDark(systemTheme === 'dark');
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const setTheme = async (dark) => {
    setIsDark(dark);
    try {
      await AsyncStorage.setItem('bombeiros_theme', dark ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const toggleTheme = () => setTheme(!isDark);

  const colors = isDark ? darkColors : lightColors;

  // Evita renderizar até o tema estar carregado
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ colors, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};