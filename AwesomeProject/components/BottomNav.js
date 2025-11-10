// components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SettingsIcon from './SettingsIcon';
import HomeIcon from './HomeIcon';
import UserIcon from './UserIcon';

const BottomNav = ({ 
  onConfigPress, 
  onHomePress, 
  onUserPress 
}) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onConfigPress}
      >
        <View style={styles.iconWrapper}>
          <SettingsIcon width={26} height={26} color="#f8f8f8" />
        </View>
        <Text style={styles.navText}>Configurações</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onHomePress}
      >
        <View style={styles.iconWrapper}>
          <HomeIcon size={26} color="#f8f8f8" />
        </View>
        <Text style={styles.navText}>Início</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onUserPress}
      >
        <View style={styles.iconWrapper}>
          <UserIcon width={26} height={26} color="#f8f8f8" />
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
    backgroundColor: '#BC010C',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#34495e',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  navText: {
    color: '#f8f8f8',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default BottomNav;