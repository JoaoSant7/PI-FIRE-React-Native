import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

const TextInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style 
}) => {
  return (
    <RNTextInput
      style={[
        styles.input,
        multiline && styles.multiline,
        style
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8, // Aumentado para melhor aparência
    paddingHorizontal: 12, // Aumentado
    paddingVertical: 14, // Aumentado significativamente
    fontSize: 16, // Aumentado para melhor legibilidade
    backgroundColor: 'white',
    minHeight: 50, // Altura mínima garantida
    color: '#333', // Cor do texto mais escura
  },
  multiline: {
    minHeight: 100, // Aumentado
    textAlignVertical: 'top',
    paddingTop: 12, // Padding superior adicional para áreas de texto
  },
});

export default TextInput;