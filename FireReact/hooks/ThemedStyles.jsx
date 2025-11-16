// hooks/useThemedStyles.js
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { StyleSheet, PixelRatio } from 'react-native';

export const useThemedStyles = (createStyles) => {
  const { colors } = useTheme();
  const { settings } = useSettings();

  // aplica escala de fonte baseada em settings.fontScale; se não houver, usa 1
  const fontScale = settings && settings.fontScale ? settings.fontScale : 1;

  // helper para escalar tamanhos de fonte em estilos
  const scaleFont = (size) => {
    // utiliza PixelRatio para aproximar escalonamento nativo
    return Math.round(PixelRatio.roundToNearestPixel(size * fontScale));
  };

  // passa scaleFont como segundo argumento para createStyles
  return StyleSheet.create(createStyles(colors, scaleFont));
};