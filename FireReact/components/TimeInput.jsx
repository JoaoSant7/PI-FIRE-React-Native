// components/TimeInput.js (versão avançada)
import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const TimeInput = ({ value, onChangeText, placeholder, showValidation = true, ...props }) => {
  const { colors } = useTheme();
  const [internalValue, setInternalValue] = useState(value || '');
  const [isValid, setIsValid] = useState(true);

  const validateTime = (timeString) => {
    if (!timeString) return true;
    
    const timeParts = timeString.split(':').filter(part => part !== '');
    
    if (timeParts.length === 0) return true;
    
    // Valida horas
    if (timeParts.length >= 1) {
      const hours = parseInt(timeParts[0], 10);
      if (isNaN(hours) || hours < 0 || hours > 23) return false;
    }
    
    // Valida minutos
    if (timeParts.length >= 2) {
      const minutes = parseInt(timeParts[1], 10);
      if (isNaN(minutes) || minutes < 0 || minutes > 59) return false;
    }
    
    // Valida segundos
    if (timeParts.length >= 3) {
      const seconds = parseInt(timeParts[2], 10);
      if (isNaN(seconds) || seconds < 0 || seconds > 59) return false;
    }
    
    return true;
  };

  const validateAndFormatTime = (input) => {
    // Remove caracteres não numéricos
    let numbers = input.replace(/\D/g, '');
    
    // Limita a 6 dígitos (HHMMSS)
    numbers = numbers.substring(0, 6);
    
    let formatted = '';
    let hours = '', minutes = '', seconds = '';
    
    if (numbers.length > 0) {
      hours = numbers.substring(0, 2);
      if (hours.length === 2) {
        let h = parseInt(hours, 10);
        if (h > 23) hours = '23';
        formatted += hours + ':';
      } else {
        formatted += hours;
      }
    }
    
    if (numbers.length > 2) {
      minutes = numbers.substring(2, 4);
      if (minutes.length === 2) {
        let m = parseInt(minutes, 10);
        if (m > 59) minutes = '59';
        formatted += minutes + ':';
      } else {
        formatted += minutes;
      }
    }
    
    if (numbers.length > 4) {
      seconds = numbers.substring(4, 6);
      if (seconds.length === 2) {
        let s = parseInt(seconds, 10);
        if (s > 59) seconds = '59';
        formatted += seconds;
      } else {
        formatted += seconds;
      }
    }
    
    // Remove o último ':' se necessário
    if (formatted.endsWith(':')) {
      formatted = formatted.slice(0, -1);
    }
    
    return formatted;
  };

  const handleChange = (text) => {
    const formattedTime = validateAndFormatTime(text);
    const valid = validateTime(formattedTime);
    
    setInternalValue(formattedTime);
    setIsValid(valid);
    
    if (onChangeText) {
      onChangeText(formattedTime);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          !isValid && styles.inputError,
          {
            backgroundColor: colors.inputBackground,
            borderColor: !isValid ? colors.error : colors.inputBorder,
            color: colors.inputText,
          }
        ]}
        value={internalValue}
        onChangeText={handleChange}
        placeholder={placeholder || "00:00:00"}
        placeholderTextColor={colors.inputPlaceholder}
        keyboardType="numeric"
        maxLength={8} // HH:MM:SS
        {...props}
      />
      {showValidation && !isValid && internalValue && (
        <Text style={[styles.errorText, { color: colors.error }]}>Horário inválido</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 44,
  },
  inputError: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default TimeInput;