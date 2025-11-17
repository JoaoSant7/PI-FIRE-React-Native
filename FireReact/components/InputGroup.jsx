// components/InputGroup.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchablePicker from "./SearchablePicker";

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
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
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
    color: "#555",
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
});

export default InputGroup;
