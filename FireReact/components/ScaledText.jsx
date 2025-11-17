import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';
import { applyFontScale } from '../utils/fontScale';

// Componente Text que aplica escala de fonte global automaticamente.
// Se não houver `fontSize` no style, aplica uma `baseFontSize` (padrão 14)
// multiplicada por `fontScale` para garantir cobertura global.
const ScaledText = ({ style, children, defaultFontSize, ...rest }) => {
  const { settings } = useSettings();
  const fontScale = settings && settings.fontScale ? settings.fontScale : 1;

  const flattenStyle = StyleSheet.flatten(style) || {};
  const scaledStyle = { ...flattenStyle };

  if (flattenStyle.fontSize) {
    scaledStyle.fontSize = applyFontScale(flattenStyle.fontSize, fontScale);
  } else {
    const base = typeof defaultFontSize === 'number' ? defaultFontSize : 14;
    scaledStyle.fontSize = applyFontScale(base, fontScale);
  }

  return (
    <Text style={[style, scaledStyle]} {...rest}>
      {children}
    </Text>
  );
};

export default ScaledText;
