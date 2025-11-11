// hooks/useThemedStyles.js
import { useTheme } from '../contexts/ThemeContext';
import { StyleSheet } from 'react-native';

export const useThemedStyles = (createStyles) => {
  const { colors } = useTheme();
  return StyleSheet.create(createStyles(colors));
};