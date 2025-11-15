// screens/DashboardScreen.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useOcorrencias } from "../hooks/useOcorrencias";
import { useTheme } from "../contexts/ThemeContext";

const DashboardScreen = () => {
  const ScreenWidth = Dimensions.get("window").width;
  const {
    ocorrencias,
    loading,
    error,
    lastSync,
    refreshing,
    atualizarDados,
    recarregarDados,
  } = useOcorrencias();
  const { colors } = useTheme();

  // Processar dados para os gráficos baseado nas ocorrências reais
  const processarDadosDashboard = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return {
        totalOcorrencias: "0",
        emAndamento: "0",
        ocorrenciasAtendidas: "0",
        tempoMedioResposta: "0min",
      };
    }

    const totalOcorrencias = ocorrencias.length;
    const emAndamento = ocorrencias.filter(
      (oc) => oc.status === "em_andamento" || oc.status === "pendente"
    ).length;
    const ocorrenciasAtendidas = ocorrencias.filter(
      (oc) => oc.status === "finalizada" || oc.status === "atendida"
    ).length;

    // Calcular tempo médio de resposta
    const temposResposta = ocorrencias
      .filter((oc) => oc.tempoResposta && oc.tempoResposta > 0)
      .map((oc) => oc.tempoResposta);

    const tempoMedio =
      temposResposta.length > 0
        ? Math.round(
            temposResposta.reduce((a, b) => a + b, 0) / temposResposta.length
          )
        : 0;

    return {
      totalOcorrencias: totalOcorrencias.toString(),
      emAndamento: emAndamento.toString(),
      ocorrenciasAtendidas: ocorrenciasAtendidas.toString(),
      tempoMedioResposta: `${tempoMedio}min`,
    };
  };

  // Processar dados para gráfico de pizza (por tipo/natureza)
  const processarDadosPizza = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return [
        {
          name: "Sem dados",
          population: 1,
          color: colors.divider,
          legendFontColor: colors.textSecondary,
        },
      ];
    }

    const tiposCount = {};
    ocorrencias.forEach((ocorrencia) => {
      const tipo = ocorrencia.tipo || ocorrencia.natureza || "Outros";
      tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
    });

    const cores = [
      colors.primary,
      colors.info,
      colors.warning,
      colors.success,
      colors.primaryLight,
      colors.error,
    ];

    return Object.entries(tiposCount).map(([name, population], index) => ({
      name: name.length > 15 ? name.substring(0, 12) + "..." : name,
      population,
      color: cores[index % cores.length],
      legendFontColor: colors.textSecondary,
    }));
  };

  // Processar dados para gráfico de barras (por região)
  const processarDadosBarras = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return {
        labels: ["Sem dados"],
        datasets: [{ data: [1] }],
      };
    }

    const regioesCount = {};
    ocorrencias.forEach((ocorrencia) => {
      const regiao = ocorrencia.regiao || ocorrencia.bairro || "Não informada";
      regioesCount[regiao] = (regioesCount[regiao] || 0) + 1;
    });

    const labels = Object.keys(regioesCount).map((regiao) =>
      regiao.length > 8 ? regiao.substring(0, 6) + "..." : regiao
    );
    const data = Object.values(regioesCount);

    return {
      labels,
      datasets: [{ data }],
    };
  };

  // Processar dados para gráfico de linha (semanal)
  const processarDadosLinha = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
      };
    }

    // Agrupar por dia da semana (últimos 7 dias)
    const ultimos7Dias = Array.from({ length: 7 }, (_, i) => {
      const data = new Date();
      data.setDate(data.getDate() - i);
      return data.toISOString().split("T")[0];
    }).reverse();

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const contagemPorDia = ultimos7Dias.map((data) => {
      return ocorrencias.filter((oc) => {
        const dataOcorrencia = oc.dataHora ? oc.dataHora.split("T")[0] : null;
        return dataOcorrencia === data;
      }).length;
    });

    return {
      labels: ultimos7Dias.map(
        (data, index) => diasSemana[new Date(data).getDay()]
      ),
      datasets: [
        {
          data: contagemPorDia,
          color: (opacity = 1) => colors.info,
        },
      ],
    };
  };

  // Processar dados para gráfico de turnos
  const processarDadosTurnos = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return {
        labels: ["Manhã", "Tarde", "Noite", "Madrugada"],
        datasets: [{ data: [0, 0, 0, 0] }],
      };
    }

    const turnos = {
      Manhã: 0,
      Tarde: 0,
      Noite: 0,
      Madrugada: 0,
    };

    ocorrencias.forEach((ocorrencia) => {
      if (ocorrencia.dataHora) {
        const hora = new Date(ocorrencia.dataHora).getHours();
        if (hora >= 6 && hora < 12) turnos["Manhã"]++;
        else if (hora >= 12 && hora < 18) turnos["Tarde"]++;
        else if (hora >= 18 && hora < 24) turnos["Noite"]++;
        else turnos["Madrugada"]++;
      }
    });

    return {
      labels: Object.keys(turnos),
      datasets: [{ data: Object.values(turnos) }],
    };
  };

  const dashboardData = processarDadosDashboard();
  const pieData = processarDadosPizza();
  const barData = processarDadosBarras();
  const lineData = processarDadosLinha();
  const turnoData = processarDadosTurnos();

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    color: (opacity = 1) => colors.text,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 0,
    legendFontColor: colors.textSecondary,
    propsForLabels: {
      fontSize: 10,
    },
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return "Nunca";
    return new Date(timestamp).toLocaleString("pt-BR");
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.info} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={atualizarDados}
            colors={[colors.info]}
            tintColor={colors.info}
          />
        }
      >
        {/* Cabeçalho com Status */}
        <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.divider }]}> 
          <View style={styles.headerRow}>
            <Text style={[styles.title, { color: colors.text }]}>Dashboard Operacional</Text>
            <TouchableOpacity
              onPress={recarregarDados}
              style={styles.syncButton}
            >
              <Ionicons name="refresh" size={24} color={colors.info} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }] }>
            {ocorrencias?.length || 0} ocorrências registradas
          </Text>

          {error && (
            <View style={[styles.errorBanner, { backgroundColor: colors.error }] }>
              <Ionicons name="warning" size={16} color={colors.textOnPrimary} />
              <Text style={[styles.errorText, { color: colors.textOnPrimary }]}>{error}</Text>
            </View>
          )}

          <View style={styles.syncInfo}>
            <Ionicons name="time" size={12} color={colors.textSecondary} />
            <Text style={[styles.syncText, { color: colors.textSecondary }]}>Última sincronização: {formatarData(lastSync)}</Text>
          </View>
        </View>

        {/* Visão Geral */}
        <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadowColor }] }>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Visão Geral</Text>
          <View style={styles.statsContainer}>
            <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }] }>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {dashboardData.totalOcorrencias}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total de Ocorrências</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }] }>
              <Text style={[styles.statValue, { color: colors.warning }]}>
                {dashboardData.emAndamento}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Em Andamento</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }] }>
              <Text style={[styles.statValue, { color: colors.success }]}>
                {dashboardData.ocorrenciasAtendidas}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Ocorrências Atendidas</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }] }>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {dashboardData.tempoMedioResposta}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tempo Médio Resposta</Text>
            </View>
          </View>
        </View>

        {/* Divisor */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Análise de Dados */}
        <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadowColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Análise de Dados</Text>

          {/* Gráfico de Pizza - Ocorrências por Natureza */}
          <View style={styles.chartSection}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Ocorrências por Natureza</Text>
            <PieChart
              data={pieData}
              width={ScreenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              hasLegend={true}
            />
          </View>

          {/* Gráfico de Barras - Ocorrências por Região */}
          <View style={styles.chartSection}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Ocorrências por Região</Text>
            <BarChart
              data={barData}
              width={ScreenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero
              showBarTops={false}
            />
          </View>

          {/* Gráfico de Linha - Ocorrências Semanais */}
          <View style={styles.chartSection}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Ocorrências Semanais</Text>
            <LineChart
              data={lineData}
              width={ScreenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              withVerticalLines={false}
              withHorizontalLines={false}
            />
          </View>

          {/* Gráfico de Barras - Ocorrências por Turno */}
          <View style={styles.chartSection}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Ocorrências por Turno</Text>
            <BarChart
              data={turnoData}
              width={ScreenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              fromZero
              showBarTops={false}
            />
          </View>
        </View>

        {/* Informações Adicionais */}
        <View style={[styles.infoSection, { backgroundColor: colors.surface }] }>
          <Text style={[styles.infoText, { color: colors.info }]}>💡 Os dados são atualizados automaticamente. Arraste para baixo para atualizar.</Text>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  syncButton: {
    padding: 8,
    position: "absolute",
    right: 0,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  errorText: {
    marginLeft: 8,
    fontSize: 12,
    flex: 1,
  },
  syncInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  syncText: {
    fontSize: 12,
    marginLeft: 4,
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
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    borderRadius: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
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
    fontWeight: "600",
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  infoSection: {
    margin: 16,
    borderRadius: 8,
    padding: 12,
  },
  infoText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default DashboardScreen;
