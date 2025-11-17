// components/InputGroup.js
import React from "react";
import { View, StyleSheet } from "react-native";
import ScaledText from './ScaledText';
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
      <ScaledText style={styles.label}>
        {label} {required && <ScaledText style={styles.required}>*</ScaledText>}
      </ScaledText>

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
