// components/CameraIcon.js
import React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from '../contexts/ThemeContext';

const CameraIcon = ({ width = 24, height = 24, color }) => {
  const { colors } = useTheme();
  const strokeColor = color || colors.text;
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17a4 4 0 100-8 4 4 0 000 8z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CameraIcon;
