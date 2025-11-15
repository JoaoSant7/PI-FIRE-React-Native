// components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeIcon from './HomeIcon';
import UserIcon from './UserIcon';
import PlusIcon from './PlusIcon';
import { useTheme } from '../contexts/ThemeContext';

const BottomNav = ({ 
  onHomePress, 
  onUserPress,
  onNewOccurrencePress 
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.bottomNav, { backgroundColor: colors.primary, borderTopColor: colors.primaryDark }]}>
      {/* Botão Home - Lado Esquerdo */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onHomePress}
      >
        <View style={styles.iconWrapper}>
          <HomeIcon size={24} color={colors.textOnPrimary} />
        </View>
        <Text style={[styles.navText, { color: colors.textOnPrimary }]}>Início</Text>
      </TouchableOpacity>
      
      {/* Botão Nova Ocorrência - Centro */}
      <TouchableOpacity 
        style={styles.centralNavItem} 
        onPress={onNewOccurrencePress}
      >
        <View style={styles.centralIconWrapper}>
          <PlusIcon width={42} height={42} color={colors.primary} />
        </View>
        <Text style={[styles.navText, { color: colors.textOnPrimary }]}>Nova Ocorrência</Text>
      </TouchableOpacity>
      
      {/* Botão Usuário - Lado Direito */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onUserPress}
      >
        <View style={styles.iconWrapper}>
          <UserIcon width={24} height={24} color={colors.textOnPrimary} />
        </View>
        <Text style={[styles.navText, { color: colors.textOnPrimary }]}>Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
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
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BottomNav;