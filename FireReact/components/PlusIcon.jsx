// components/PlusIcon.js
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

const PlusIcon = ({ width = 50, height = 50, color }) => {
  const { colors } = useTheme();
  const strokeColor = color || colors.primary;
  return (
    <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
      {/* Círculo de fundo */}
      <Circle cx="25" cy="25" r="24" fill={colors.card} stroke={strokeColor} strokeWidth="1"/>
      {/* Símbolo de plus */}
      <Path
        d="M25 15V35M15 25H35"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusIcon;