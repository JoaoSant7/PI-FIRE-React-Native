import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

// Import dos estilos e hook de escala de fonte
import styles, { createUsuarioStyles } from "../styles/UsuarioStyles";
import { useFontScale } from "../hooks/useFontScale";
import { AuthContext } from "../contexts/AuthContext";

// Componente reutilizável para as linhas de informação
const InfoRow = ({ label, value, dynamicStyles }) => (
  <View style={dynamicStyles.infoRow}>
    <Text style={dynamicStyles.infoLabel}>{label}</Text>
    <Text style={dynamicStyles.infoValue}>{value || "Não informado"}</Text>
  </View>
);

export default function UsuarioScreen({ navigation, route }) {
  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createUsuarioStyles(scaleFont), [scaleFont]);

  const { logout, user } = React.useContext(AuthContext);
  
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  // Carrega os dados do usuário ao montar o componente
  React.useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // OPÇÃO 1: Se os dados já vêm do AuthContext
      if (user) {
        setUserData({
          nome: user.nome || user.name,
          email: user.email,
          matricula: user.matricula,
          telefone: user.telefone || user.phone,
        });
      }
      
      // OPÇÃO 2: Se precisar buscar dados adicionais da API
      // const response = await fetch(`https://sua-api.com/usuarios/${user.id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${user.token}`
      //   }
      // });
      // const data = await response.json();
      // setUserData({
      //   nome: data.nome,
      //   email: data.email,
      //   matricula: data.matricula,
      //   telefone: data.telefone,
      // });
      
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => {
            try {
              logout();
            } catch (e) {
              console.warn("Erro ao tentar deslogar:", e);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[dynamicStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#bc010c" />
        <Text style={{ marginTop: 10, color: '#666' }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      <ScrollView style={dynamicStyles.scrollContent}>
        {/* Nome do Usuário */}
        <View style={dynamicStyles.userInfoHeader}>
          <Text style={dynamicStyles.userName}>{userData?.nome || "Usuário"}</Text>
        </View>

        {/* Informações do Usuário */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Informações da Conta</Text>

          <InfoRow 
            label="Nome Completo" 
            value={userData?.nome} 
            dynamicStyles={dynamicStyles} 
          />
          <InfoRow 
            label="E-mail" 
            value={userData?.email} 
            dynamicStyles={dynamicStyles} 
          />
          <InfoRow 
            label="Matrícula" 
            value={userData?.matricula} 
            dynamicStyles={dynamicStyles} 
          />
          <InfoRow 
            label="Telefone" 
            value={userData?.telefone} 
            dynamicStyles={dynamicStyles} 
          />
        </View>

        {/* Botão Sair */}
        <View style={dynamicStyles.logoutSection}>
          <TouchableOpacity 
            style={dynamicStyles.logoutButton} 
            onPress={handleLogout}
          >
            <Text style={dynamicStyles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}