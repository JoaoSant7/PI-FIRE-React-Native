// components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeIcon from './HomeIcon';
import UserIcon from './UserIcon';
import PlusIcon from './PlusIcon';

const BottomNav = ({ 
  onHomePress, 
  onUserPress,
  onNewOccurrencePress 
}) => {
  return (
    <View style={styles.bottomNav}>
      {/* Botão Home - Lado Esquerdo */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onHomePress}
      >
        <View style={styles.iconWrapper}>
          <HomeIcon size={24} color="#f8f8f8" />
        </View>
        <Text style={styles.navText}>Início</Text>
      </TouchableOpacity>
      
      {/* Botão Nova Ocorrência - Centro */}
      <TouchableOpacity 
        style={styles.centralNavItem} 
        onPress={onNewOccurrencePress}
      >
        <View style={styles.centralIconWrapper}>
          <PlusIcon width={42} height={42} color="#bc010c" />
        </View>
        <Text style={styles.navText}>Nova Ocorrência</Text>
      </TouchableOpacity>
      
      {/* Botão Usuário - Lado Direito */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onUserPress}
      >
        <View style={styles.iconWrapper}>
          <UserIcon width={24} height={24} color="#f8f8f8" />
        </View>
        <Text style={styles.navText}>Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#bc010c',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#a0010a',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  centralNavItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  centralIconWrapper: {
    marginBottom: 4,
  },
  navText: {
    color: '#f8f8f8',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BottomNav;