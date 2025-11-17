import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import ScaledText from './ScaledText';
import { useNavigation } from "@react-navigation/native";

const ExportButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Export")}
    >
      <ScaledText style={styles.buttonText}>Exportar</ScaledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff9800",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ExportButton;
