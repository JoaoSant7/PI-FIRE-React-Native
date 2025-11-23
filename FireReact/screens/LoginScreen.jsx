// screens/LoginScreen.jsx
import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useFontScale } from "../hooks/useFontScale";

// Import dos estilos
import styles, { createLoginStyles } from "../styles/LoginStyles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createLoginStyles(scaleFont), [scaleFont]);

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    if (email && password) {
      login();
    } else {
      alert("Por favor, preencha email e senha!");
    }
  };

  const handleForgotPassword = () => {
    alert(
      "Entre em contato com o setor de suporte técnico do seu batalhão para realizar a recuperação de sua senha."
    );
  };

  return (
    <KeyboardAvoidingView
      style={dynamicStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={dynamicStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={dynamicStyles.header}>
          <Image
            source={require("../components/Fire-noBG.png")}
            style={dynamicStyles.logo}
            resizeMode="contain"
          />
          <Text style={dynamicStyles.fireTitle}>FIRE</Text>
          <Text style={dynamicStyles.subtitle}>
            Ferramenta Integrada de Resposta a Emergências
          </Text>
        </View>

        <View style={dynamicStyles.formContainer}>
          <View style={dynamicStyles.inputWrapper}>
            <Text style={dynamicStyles.label}>E-MAIL</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={dynamicStyles.inputWrapper}>
            <Text style={dynamicStyles.label}>SENHA</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Sua senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={dynamicStyles.forgotPasswordButton}
            onPress={handleForgotPassword}
          >
            <Text style={dynamicStyles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              dynamicStyles.loginButton,
              (!email || !password) && dynamicStyles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!email || !password}
          >
            <Text style={dynamicStyles.loginButtonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
