import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerInput = ({ 
  selectedValue, 
  onValueChange, 
  items, 
  placeholder,
  style 
}) => {
  return (
    <View style={[styles.pickerContainer, style]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        mode="dropdown"
        dropdownIconColor="#000"
      >
        {placeholder && <Picker.Item label={placeholder} value="" />}
        {items.map((item, index) => (
          <Picker.Item 
            key={index} 
            label={item.label} 
            value={item.value} 
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
});

export default PickerInput;