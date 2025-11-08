import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerInput = ({ 
  value, 
  onDateChange, 
  showPicker, 
  setShowPicker,
  placeholder = "Selecione a data e hora"
}) => {
  return (
    <>
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setShowPicker(true)}
      >
        <Text style={value ? styles.dateText : styles.placeholderText}>
          {value ? value.toLocaleDateString('pt-BR') : placeholder}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  dateText: {
    color: '#000',
  },
  placeholderText: {
    color: '#999',
  },
});

export default DatePickerInput;