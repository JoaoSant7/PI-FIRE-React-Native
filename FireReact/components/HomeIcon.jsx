// components/HomeIcon.js
import React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from '../contexts/ThemeContext';

export default function HomeIcon({ size = 24, color }) {
  const { colors } = useTheme();
  const finalColor = color || colors.text;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
        fill={finalColor}
      />
    </Svg>
  );
}