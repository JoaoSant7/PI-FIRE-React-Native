// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FIRE</Text>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.content}>
        {/* Seção "O que você deseja acessar?" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que você deseja acessar?</Text>
          
          {/* Botões de Acesso */}
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Unidade</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Descrição</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Vítimas</Text>
          </TouchableOpacity>
        </View>

        {/* Linha divisória */}
        <View style={styles.divider} />

        {/* Menu Inferior */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.bottomMenuItem}>
            <Text style={styles.bottomMenuTextActive}>INÍCIO</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bottomMenuItem}>
            <Text style={styles.bottomMenuText}>OCORRÊNCIAS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bottomMenuItem}>
            <Text style={styles.bottomMenuText}>PRAIAS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (os mesmos estilos que te passei anteriormente)
});