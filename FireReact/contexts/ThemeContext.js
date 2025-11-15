// contexts/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSettings } from './SettingsContext';

// Cores específicas para aplicativo de emergência
const lightColors = {
  // Cores principais
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
  
  // Cores de status
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Cores de UI
  border: '#E0E0E0',
  divider: '#EEEEEE',
  backdrop: 'rgba(0,0,0,0.5)',
  
  // Cores de input e componentes
  inputBackground: '#FFFFFF',
  inputBorder: '#DDDDDD',
  inputText: '#333333',
  inputPlaceholder: '#999999',
  
  // Cores de switch
  switchTrackInactive: '#767577',
  switchThumbInactive: '#F4F3F4',
  
  // Sombra
  shadowColor: '#000000',
};

const darkColors = {
  // Cores principais
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
  
  // Cores de status
  success: '#66BB6A',
  warning: '#FFB74D',
  error: '#EF5350',
  info: '#64B5F6',
  
  // Cores de UI
  border: '#333333',
  divider: '#383838',
  backdrop: 'rgba(255,255,255,0.1)',
  
  // Cores de input e componentes
  inputBackground: '#1E1E1E',
  inputBorder: '#404040',
  inputText: '#FFFFFF',
  inputPlaceholder: '#888888',
  
  // Cores de switch
  switchTrackInactive: '#404040',
  switchThumbInactive: '#F4F3F4',
  
  // Sombra
  shadowColor: '#000000',
};

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const { settings, updateSetting } = useSettings();
  const [isLoaded, setIsLoaded] = useState(false);

  // Aguarda settings carregar
  useEffect(() => {
    if (settings) setIsLoaded(true);
  }, [settings]);

  // O valor da configuração controla o tema
  const isDark = settings?.darkMode === true;

  // Para alterar o tema via ThemeContext (opcional)
  const setTheme = async (dark) => {
    updateSetting('darkMode', dark);
  };

  const toggleTheme = () => {
    setTheme(!isDark);
  };

  const colors = isDark ? darkColors : lightColors;

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