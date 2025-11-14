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
          color: "#CCCCCC",
          legendFontColor: "#7F7F7F",
        },
      ];
    }

    const tiposCount = {};
    ocorrencias.forEach((ocorrencia) => {
      const tipo = ocorrencia.tipo || ocorrencia.natureza || "Outros";
      tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
    });

    const cores = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
    ];

    return Object.entries(tiposCount).map(([name, population], index) => ({
      name: name.length > 15 ? name.substring(0, 12) + "..." : name,
      population,
      color: cores[index % cores.length],
      legendFontColor: "#7F7F7F",
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
          color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
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
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 0,
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
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#36A2EB" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={atualizarDados}
            colors={["#36A2EB"]}
            tintColor="#36A2EB"
          />
        }
      >
        {/* Cabeçalho com Status */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Dashboard Operacional</Text>
            <TouchableOpacity
              onPress={recarregarDados}
              style={styles.syncButton}
            >
              <Ionicons name="refresh" size={24} color="#36A2EB" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            {ocorrencias?.length || 0} ocorrências registradas
          </Text>

          {error && (
            <View style={styles.errorBanner}>
              <Ionicons name="warning" size={16} color="#fff" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.syncInfo}>
            <Ionicons name="time" size={12} color="#666" />
            <Text style={styles.syncText}>
              Última sincronização: {formatarData(lastSync)}
            </Text>
          </View>
        </View>

        {/* Visão Geral */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visão Geral</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {dashboardData.totalOcorrencias}
              </Text>
              <Text style={styles.statLabel}>Total de Ocorrências</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, styles.emphasis]}>
                {dashboardData.emAndamento}
              </Text>
              <Text style={styles.statLabel}>Em Andamento</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, styles.success]}>
                {dashboardData.ocorrenciasAtendidas}
              </Text>
              <Text style={styles.statLabel}>Ocorrências Atendidas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {dashboardData.tempoMedioResposta}
              </Text>
              <Text style={styles.statLabel}>Tempo Médio Resposta</Text>
            </View>
          </View>
        </View>

        {/* Divisor */}
        <View style={styles.divider} />

        {/* Análise de Dados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análise de Dados</Text>

          {/* Gráfico de Pizza - Ocorrências por Natureza */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Ocorrências por Natureza</Text>
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
            <Text style={styles.chartTitle}>Ocorrências por Região</Text>
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
            <Text style={styles.chartTitle}>Ocorrências Semanais</Text>
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
            <Text style={styles.chartTitle}>Ocorrências por Turno</Text>
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
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            💡 Os dados são atualizados automaticamente. Arraste para baixo para
            atualizar.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
    color: "#333",
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
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  errorText: {
    color: "#fff",
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
    color: "#666",
    marginLeft: 4,
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
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
    color: "#333",
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
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  emphasis: {
    color: "#e74c3c",
  },
  success: {
    color: "#27ae60",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  infoSection: {
    backgroundColor: "#e3f2fd",
    margin: 16,
    borderRadius: 8,
    padding: 12,
  },
  infoText: {
    fontSize: 12,
    color: "#1976d2",
    textAlign: "center",
  },
});

export default DashboardScreen;
