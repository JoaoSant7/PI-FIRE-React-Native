// components/PickerInput.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
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
        itemStyle={styles.pickerItem}
      >
        {placeholder && (
          <Picker.Item 
            label={placeholder} 
            value="" 
          />
        )}
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
    borderRadius: 8,
    backgroundColor: 'white',
    width: '100%',
    ...Platform.select({
      ios: {
        height: 48,
        justifyContent: 'center',
      },
      android: {
        height: 56,
        justifyContent: 'center',
      },
    }),
  },
  picker: {
    flex: 1,
    width: '100%',
    color: '#000',
    ...Platform.select({
      ios: {
        fontSize: 16,
        height: 48,
      },
      android: {
        fontSize: 16,
        height: 56,
        textAlign: 'left',
        paddingHorizontal: 8,
      },
    }),
  },
  pickerItem: {
    fontSize: 16,
    ...Platform.select({
      android: {
        textAlign: 'left',
        height: 56,
      },
      ios: {
        height: 48,
      },
    }),
  },
});

export default PickerInput;
