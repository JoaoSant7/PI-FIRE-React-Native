import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const formatTime = (text) => {
  let cleaned = text.replace(/\D/g, '');
  cleaned = cleaned.substring(0, 6);
  
  let formatted = '';
  for (let i = 0; i < cleaned.length; i++) {
    if (i === 2 || i === 4) formatted += ':';
    formatted += cleaned[i];
  }
  
  return formatted;
};

const TimeInput = ({ value, onChangeText, placeholder, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={(text) => onChangeText(formatTime(text))}
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType="numeric"
      maxLength={8}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    backgroundColor: 'white',
  },
});

export default TimeInput;