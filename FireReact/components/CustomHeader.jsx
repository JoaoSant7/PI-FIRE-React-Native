import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { Header, Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Importe o hook

export default function TopBar() {
  const navigation = useNavigation(); // Use o hook

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#BC010C" }}>
      <StatusBar barStyle="light-content" backgroundColor="#BC010C" />
      <Header
        backgroundColor="#BC010C"
        placement="center"
        leftComponent={{
          text: "FIRE",
          style: { color: "#fff", fontWeight: "bold", fontSize: 20 },
        }}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("Configuracoes")} // Use navigation aqui
            style={{ padding: 5 }}
          >
            <Icon name="settings" color="#fff" />
          </TouchableOpacity>
        }
        containerStyle={{
          width: "100%",
          borderBottomWidth: 0,
        }}
      />
    </SafeAreaView>
  );
}
