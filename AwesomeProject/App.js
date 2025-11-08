// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import de Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UsuarioScreen from './screens/UsuarioScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import DashboardScreen from './screens/DashboardScreen';
import ListarOcorrenciasScreen from './screens/ListarOcorrenciasScreen';
import NovaOcorrenciaScreen from './screens/NovaOcorrenciaScreen';

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
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Usuario" 
      component={UsuarioScreen}
      options={{ 
        ...headerOptions,
        title: 'Perfil do Usuário'
      }}
    />
    <Stack.Screen 
      name="Configuracoes" 
      component={ConfiguracoesScreen}
      options={{ 
        ...headerOptions,
        title: 'Configurações'
      }}
    />
    <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options={{ 
        ...headerOptions,
        title: 'Dashboard'
      }}
    />
    <Stack.Screen 
      name="ListarOcorrencias" 
      component={ListarOcorrenciasScreen}
      options={{ 
        ...headerOptions,
        title: 'Lista de Ocorrências'
      }}
    />
    <Stack.Screen 
      name="NovaOcorrencia" 
      component={NovaOcorrenciaScreen}
      options={{ 
        ...headerOptions,
        title: 'Nova Ocorrência'
      }}
    />
  </Stack.Navigator>
);

// Componente Principal
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        backgroundColor={THEME_COLORS.primary} 
        barStyle="light-content" 
      />
      <MainStack />
    </NavigationContainer>
  );
}