import { PixelRatio } from 'react-native';

export const applyFontScale = (size, fontScale = 1) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * fontScale));
};

export default applyFontScale;
