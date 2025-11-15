import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const TextInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style 
}) => {
  const { colors } = useTheme();

  return (
    <RNTextInput
      style={[
        styles.input,
        multiline && styles.multiline,
        {
          borderColor: colors.inputBorder,
          backgroundColor: colors.inputBackground,
          color: colors.inputText,
        },
        style
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.inputPlaceholder}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 50,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
});

export default TextInput;