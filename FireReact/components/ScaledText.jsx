import React from 'react';
import { Text } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

// Componente Text que aplica escala de fonte global automaticamente
export const ScaledText = ({ style, children, ...rest }) => {
  const { settings } = useSettings();
  const fontScale = settings && settings.fontScale ? settings.fontScale : 1;

  // se o style for um array, achamos entradas de fontSize e aplicamos a escala
  const flattenStyle = Array.isArray(style) ? Object.assign({}, ...style) : style || {};
  let scaledStyle = { ...flattenStyle };
  if (flattenStyle.fontSize) {
    scaledStyle.fontSize = Math.round(flattenStyle.fontSize * fontScale);
  }

  // mantemos o restante do estilo e props
  return (
    <Text style={[style, scaledStyle]} {...rest}>
      {children}
    </Text>
  );
};

export default ScaledText;
