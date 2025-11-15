// App.js
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import de Screens
import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import UsuarioScreen from './screens/UsuarioScreen.jsx';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import ListarOcorrenciasScreen from './screens/ListarOcorrenciasScreen.jsx';
import NovaOcorrenciaScreen from './screens/NovaOcorrenciaScreen.jsx';
import OcorrenciaRegistradaScreen from './screens/OcorrenciaRegistradaScreen.jsx';
import DetalhesOcorrenciaScreen from './screens/DetalhesOcorrenciaScreen.jsx';

// Import de Contexts
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { OcorrenciasProvider } from './contexts/OcorrenciasContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Configurações do tema
const THEME_COLORS = {
  primary: '#bc010c',
  background: '#f5f5f5',
  textLight: '#ffffff'
};

const headerOptions = {
  headerStyle: {
    backgroundColor: THEME_COLORS.primary,
  },
  headerTintColor: THEME_COLORS.textLight,
  headerTitleStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};

const Stack = createStackNavigator();

// Stack de Autenticação
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Stack Principal da Aplicação
const MainStack = () => (
  <Stack.Navigator
    screenOptions={headerOptions}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'INÍCIO'
      }}
    />
    <Stack.Screen
      name="Usuario"
      component={UsuarioScreen}
      options={{
        title: 'PERFIL DO USUÁRIO'
      }}
    />
    <Stack.Screen
      name="Configuracoes"
      component={ConfiguracoesScreen}
      options={{
        title: 'CONFIGURAÇÕES'
      }}
    />
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        title: 'DASHBOARD OPERACIONAL'
      }}
    />
    <Stack.Screen
      name="ListarOcorrencias"
      component={ListarOcorrenciasScreen}
      options={{
        title: 'LISTA DE OCORRÊNCIAS'
      }}
    />
    <Stack.Screen
      name="NovaOcorrencia"
      component={NovaOcorrenciaScreen}
      options={{
        title: 'NOVA OCORRÊNCIA'
      }}
    />
    <Stack.Screen
      name="OcorrenciaRegistrada"
      component={OcorrenciaRegistradaScreen}
      options={{
        title: 'OCORRÊNCIA REGISTRADA',
        headerLeft: null
      }}
    />
    <Stack.Screen
      name="DetalhesOcorrencia"
      component={DetalhesOcorrenciaScreen}
      options={{
        title: 'DETALHES DA OCORRÊNCIA'
      }}
    />
  </Stack.Navigator>
);

// Componente que usa o contexto para decidir qual stack mostrar
const AppContent = () => {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext);

  // Tela de carregamento enquanto verifica autenticação
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME_COLORS.primary }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={THEME_COLORS.primary}
        barStyle="light-content"
      />
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// Componente Principal
export default function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
      <AuthProvider>
        <OcorrenciasProvider>
          <AppContent />
        </OcorrenciasProvider>
      </AuthProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
} 