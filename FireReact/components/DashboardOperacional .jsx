import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const DashboardOperacional = () => {
  const { colors } = useTheme();
  // Dados mockados - você pode substituir por dados reais
  const dashboardData = {
    totalOcorrencias: '1.247',
    emAndamento: '156',
    ocorrenciasAtendidas: '1.091',
    tempoMedioResposta: '15min',
  };

  const ScreenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho */}
        <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Dashboard Operacional</Text>
        </View>

        {/* Visão Geral */}
        <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadowColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Visão Geral (Mês)</Text>
          <View style={styles.statsContainer}>
            <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>{dashboardData.totalOcorrencias}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total de Ocorrências</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>{dashboardData.emAndamento}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Em Andamento</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>{dashboardData.ocorrenciasAtendidas}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Ocorrências Atendidas</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>{dashboardData.tempoMedioResposta}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tempo Médio Resposta</Text>
            </View>
          </View>
        </View>

        {/* Divisor */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Análise de Natureza */}
        <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadowColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Análise de Natureza</Text>
          
          {/* Ocorrências por Natureza */}
          <View style={styles.chartSection}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Ocorrências por Natureza</Text>
            <View style={[styles.chartPlaceholder, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                *Espaço para Gráfico de Pizza/Barra*
              </Text>
            </View>
          </View>

          {/* Ocorrências Semanais */}
          <View style={styles.chartSection}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Ocorrências Semanais</Text>
            <View style={[styles.chartPlaceholder, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                *Espaço para Gráfico de Linha*
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DashboardOperacional;