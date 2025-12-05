import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import styles, { createLoginStyles } from '../styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { login } = React.useContext(AuthContext);

  const handleLogin = async () => {
    // Validação básica
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Atenção', 'Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);
    
    try {
      const result = await login(email.trim(), senha);
      
      if (!result.success) {
        Alert.alert('Erro no Login', result.message);
      }
      // Se o login for bem-sucedido, o usuário será redirecionado
      // automaticamente pois isAuthenticated mudou para true
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>FIRE</Text>
        <Text style={styles.subtitle}>Ferramenta Integrada de Resposta a Emergências</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Insira o seu endereço de E-Mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Digite a sua senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          editable={!loading}
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* Opcional: Link para recuperação de senha */}
        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => Alert.alert('Recuperar Senha', 'Para recuperar a sua senha, entre em contato com a equipe de suporte técnico de seu batalhão.')}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
