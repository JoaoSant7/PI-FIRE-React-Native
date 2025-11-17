// components/DateTimePickerInput.js
import React, { useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import ScaledText from './ScaledText';
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerInput = ({
  value,
  onDateTimeChange,
  placeholder = "Selecione a data e hora",
  mode = "datetime",
  style = {},
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDateTime = (date) => {
    if (!date) return "";

    if (mode === "time") {
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    }

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const onPickerChange = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      onDateTimeChange(selectedDate);
    }
  };

  const showPickerModal = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            backgroundColor: "#fff",
            minHeight: 50,
            justifyContent: "center",
          },
          style,
        ]}
        onPress={showPickerModal}
      >
        <ScaledText
          style={{
            color: value ? "#333" : "#999",
            fontSize: 16,
            textAlign: "left",
          }}
        >
          {value ? formatDateTime(value) : placeholder}
        </ScaledText>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onPickerChange}
          locale="pt-BR"
          is24Hour={true}
        />
      )}
    </View>
  );
};

export default DateTimePickerInput;
