// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import UsuarioScreen from './screens/UsuarioScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Configuracoes" 
          component={ConfiguracoesScreen}
          options={{ headerShown: true, title: 'Configurações' }}
        />
        <Stack.Screen 
          name="Usuario" 
          component={UsuarioScreen}
          options={{ headerShown: true, title: 'Perfil do Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
