// utils/fontSizes.js
/**
 * Tamanhos de fonte base do aplicativo
 * Todos os componentes devem usar esses valores
 */
export const FONT_SIZES = {
  // Tamanhos pequenos
  xs: 11,
  sm: 12,
  smMd: 13,
  
  // Tamanhos médios (padrão)
  md: 14,
  mdLg: 15,
  base: 16,
  
  // Tamanhos grandes
  lg: 18,
  xl: 20,
  xxl: 22,
  
  // Tamanhos extra grandes
  xxxl: 24,
  huge: 28,
  massive: 40,
  mega: 48,
};

/**
 * Mapeamento de tipos de texto para tamanhos de fonte
 */
export const TEXT_VARIANTS = {
  // Títulos
  h1: FONT_SIZES.mega,      // 48px - Título mega (ex: Login)
  h2: FONT_SIZES.xxxl,      // 24px - Título principal
  h3: FONT_SIZES.xxl,       // 22px - Título de página
  h4: FONT_SIZES.xl,        // 20px - Subtítulo grande
  h5: FONT_SIZES.lg,        // 18px - Título de seção
  
  // Textos
  p: FONT_SIZES.base,       // 16px - Padrão
  p_sm: FONT_SIZES.md,      // 14px - Padrão pequeno
  p_xs: FONT_SIZES.sm,      // 12px - Auxiliar
  p_xxs: FONT_SIZES.xs,     // 11px - Mínimo
  
  // Labels e inputs
  label: FONT_SIZES.base,   // 16px
  input: FONT_SIZES.base,   // 16px
  button: FONT_SIZES.base,  // 16px
  
  // Valores/números destacados
  number_lg: FONT_SIZES.huge,  // 28px
  number_md: FONT_SIZES.xxl,   // 22px
  number_sm: FONT_SIZES.base,  // 16px
};
