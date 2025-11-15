// components/PickerInput.jsx
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../contexts/ThemeContext";

const PickerInput = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
  style,
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.pickerContainer, style, { borderColor: colors.inputBorder, backgroundColor: colors.inputBackground }]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, { color: colors.inputText }]}
        mode={Platform.OS === "android" ? "dialog" : "dropdown"}
        dropdownIconColor={colors.inputText}
        itemStyle={[styles.pickerItem, { color: colors.inputText }]}
        accessibilityLabel={placeholder || "Selecione uma opção"}
      >
        {placeholder && (
          <Picker.Item label={placeholder} value="" enabled={false} />
        )}
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    ...Platform.select({
      ios: { height: 48, justifyContent: "center" },
      android: { height: 56, justifyContent: "center" },
    }),
  },
  picker: {
    flex: 1,
    width: "100%",
    ...Platform.select({
      ios: { fontSize: 16, height: 48 },
      android: {
        fontSize: 16,
        height: 56,
        textAlign: "left",
        paddingHorizontal: 8,
      },
    }),
  },
  pickerItem: {
    fontSize: 16,
    ...Platform.select({
      android: { textAlign: "left", height: 56 },
      ios: { height: 48 },
    }),
  },
});

export default PickerInput;