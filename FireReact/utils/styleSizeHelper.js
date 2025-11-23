// utils/styleSizeHelper.js
import { FONT_SIZES } from './fontSizes';

/**
 * Helper para criar estilos com tamanhos de fonte escalados
 * Uso: scaleStyles(baseSize, fontScale)
 * @param {number} baseSize - Tamanho base de fonte em pixels
 * @param {number} fontScale - Escala de fonte (0.9, 1, 1.2, etc)
 * @returns {number} Tamanho escalado arredondado
 */
export const scaleSize = (baseSize, fontScale = 1) => {
  return Math.round(baseSize * fontScale);
};

/**
 * Aplica escala de fonte a um objeto de estilo
 * @param {Object} styleObj - Objeto de estilo
 * @param {number} fontScale - Escala de fonte
 * @returns {Object} Objeto com fontSize escalado
 */
export const applyFontScale = (styleObj, fontScale = 1) => {
  const scaled = { ...styleObj };
  if (styleObj.fontSize) {
    scaled.fontSize = scaleSize(styleObj.fontSize, fontScale);
  }
  return scaled;
};

/**
 * Cria um array de estilos com escala de fonte aplicada
 * @param {Array} styles - Array de objetos de estilo
 * @param {number} fontScale - Escala de fonte
 * @returns {Array} Array de estilos com fontSize escalado
 */
export const applyFontScaleToStyleArray = (styles, fontScale = 1) => {
  return styles.map(style => {
    if (!style || typeof style !== 'object') return style;
    return applyFontScale(style, fontScale);
  });
};

/**
 * Obtém o tamanho de fonte para um tipo de variante
 * @param {string} variant - Nome da variante (h1, h2, p, etc)
 * @param {number} fontScale - Escala de fonte
 * @returns {number} Tamanho de fonte escalado
 */
export const getFontSize = (variant, fontScale = 1) => {
  const baseSize = FONT_SIZES[variant] || FONT_SIZES.base;
  return scaleSize(baseSize, fontScale);
};
