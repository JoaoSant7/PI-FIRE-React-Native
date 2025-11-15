// components/InputGroup.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchablePicker from "./SearchablePicker";
import { useTheme } from "../contexts/ThemeContext";

const InputGroup = ({
  label,
  required,
  children,
  style,
  searchable,
  // Props específicas do SearchablePicker
  selectedValue,
  onValueChange,
  items,
  placeholder,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: colors.text }]}>
        {label} {required && <Text style={[styles.required, { color: colors.error }]}>*</Text>}
      </Text>

      {searchable ? (
        <SearchablePicker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          items={items}
          placeholder={placeholder}
        />
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  required: {},
});

export default InputGroup;