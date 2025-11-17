import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScaledText from './ScaledText';

const Section = ({ title, children, style }) => {
  return (
    <View style={[styles.section, style]}>
      <ScaledText style={styles.sectionTitle}>{title}</ScaledText>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});

export default Section;