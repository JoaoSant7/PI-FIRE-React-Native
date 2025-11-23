// hooks/useFontScale.js
import { useSettings } from '../contexts/SettingsContext';
import { PixelRatio } from 'react-native';

/**
 * Hook customizado para escalar tamanhos de fonte baseado nas configurações do usuário
 * @returns {Object} Objeto com função scaleFont e fontScale
 */
export const useFontScale = () => {
  const { settings } = useSettings();
  
  // Valor padrão é 1 (100%), pode ser 0.9 (pequeno), 1 (médio), 1.2 (grande)
  const fontScale = settings?.fontScale ?? 1;

  /**
   * Escalona um tamanho de fonte base
   * @param {number} size - Tamanho da fonte em pixels
   * @returns {number} Tamanho da fonte escalado
   */
  const scaleFont = (size) => {
    const scaledSize = size * fontScale;
    // Usa PixelRatio para arredondar para o pixel mais próximo
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
  };

  return {
    scaleFont,
    fontScale,
  };
};
