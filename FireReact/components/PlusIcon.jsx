// components/PlusIcon.js
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const PlusIcon = ({ width = 50, height = 50, color = '#bc010c' }) => (
  <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
    {/* Círculo de fundo branco */}
    <Circle cx="25" cy="25" r="24" fill="white" stroke="#bc010c" strokeWidth="1"/>
    {/* Símbolo de plus vermelho */}
    <Path
      d="M25 15V35M15 25H35"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;