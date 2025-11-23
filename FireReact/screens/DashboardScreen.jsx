// screens/DashboardScreen.jsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart, BarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useOcorrencias } from "../hooks/useOcorrencias";

import styles, { createDashboardStyles } from "../styles/DashboardStyles";
import { useFontScale } from "../hooks/useFontScale";

const DashboardScreen = () => {
  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createDashboardStyles(scaleFont), [scaleFont]);
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

  const processarDadosDashboard = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return {
        totalOcorrencias: "0",
        emAndamento: "0",
        ocorrenciasAtendidas: "0",
        naoAtendidas: "0",
        tempoMedioResposta: "0min",
      };
    }

    const totalOcorrencias = ocorrencias.length;
    const emAndamento = ocorrencias.filter(
      (oc) => oc.status === "em_andamento" || oc.status === "pendente"
    ).length;
    const atendidas = ocorrencias.filter(
      (oc) => oc.status === "finalizada" || oc.status === "atendida"
    ).length;
    const naoAtendidas = totalOcorrencias - atendidas;

    const tempos = ocorrencias
      .filter((o) => o.tempoResposta)
      .map((o) => o.tempoResposta);
    const tempoMedio =
      tempos.length > 0
        ? Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length)
        : 0;

    return {
      totalOcorrencias: totalOcorrencias.toString(),
      emAndamento: emAndamento.toString(),
      ocorrenciasAtendidas: atendidas.toString(),
      naoAtendidas: naoAtendidas.toString(),
      tempoMedioResposta: `${tempoMedio}min`,
    };
  };

  const processarDadosPizza = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return [
        {
          name: "Sem dados",
          population: 1,
          color: "#9e9e9e",
          legendFontColor: "#777",
        },
      ];
    }

    const tiposCount = {};
    ocorrencias.forEach((oc) => {
      const tipo = oc.tipo || oc.natureza || "Outros";
      tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
    });

    const total = ocorrencias.length;
    const cores = [
      "#1e88e5",
      "#43a047",
      "#fb8c00",
      "#8e24aa",
      "#3949ab",
      "#00897b",
      "#f4511e",
      "#6d4c41",
    ];

    return Object.entries(tiposCount).map(([name, population], index) => {
      const pct = ((population / total) * 100).toFixed(1);
      return {
        name: `${name} (${pct}%)`,
        population,
        color: cores[index % cores.length],
        legendFontColor: "#555",
      };
    });
  };

  const processarDadosBarras = () => {
    const regioes = {};
    if (!ocorrencias || ocorrencias.length === 0) {
      return {
        labels: ["Sem dados"],
        datasets: [{ data: [1] }],
        colors: ["#9e9e9e"],
      };
    }

    ocorrencias.forEach((oc) => {
      const regiao = oc.regiao || oc.bairro || "Não informada";
      regioes[regiao] = (regioes[regiao] || 0) + 1;
    });

    const labels = Object.keys(regioes);
    const data = Object.values(regioes);

    const coresRegioes = [
      "#1e88e5",
      "#43a047",
      "#fb8c00",
      "#8e24aa",
      "#3949ab",
      "#00897b",
      "#f4511e",
      "#6d4c41",
      "#546e7a",
      "#5e35b1",
    ];

    return {
      labels: labels.map((label) =>
        label.length > 10 ? label.substring(0, 8) + "..." : label
      ),
      datasets: [{ data }],
      colors: data.map((_, index) => coresRegioes[index % coresRegioes.length]),
    };
  };

  const processarDadosDiasSemana = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return {
        labels: ["Sem dados"],
        datasets: [{ data: [1] }],
        colors: ["#9e9e9e"],
      };
    }

    const dias = {
      Domingo: 0,
      Segunda: 0,
      Terça: 0,
      Quarta: 0,
      Quinta: 0,
      Sexta: 0,
      Sábado: 0,
    };

    ocorrencias.forEach((oc) => {
      if (!oc.dataHora) return;
      const date = new Date(oc.dataHora);
      const dia = date.getDay();
      const nomes = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ];
      dias[nomes[dia]]++;
    });

    const data = Object.values(dias);

    const coresDias = [
      "#1e88e5",
      "#43a047",
      "#fb8c00",
      "#8e24aa",
      "#3949ab",
      "#00897b",
      "#f4511e",
    ];

    return {
      labels: Object.keys(dias),
      datasets: [{ data }],
      colors: coresDias,
    };
  };

  const processarDadosTurnos = () => {
    if (!ocorrencias || ocorrencias.length === 0) {
      return [
        {
          name: "Sem dados",
          population: 1,
          color: "#9e9e9e",
          legendFontColor: "#777",
        },
      ];
    }

    const turnos = { Manhã: 0, Tarde: 0, Noite: 0, Madrugada: 0 };

    ocorrencias.forEach((oc) => {
      if (!oc.dataHora) return;
      const hora = new Date(oc.dataHora).getHours();
      if (hora >= 6 && hora < 12) turnos.Manhã++;
      else if (hora >= 12 && hora < 18) turnos.Tarde++;
      else if (hora >= 18 && hora < 24) turnos.Noite++;
      else turnos.Madrugada++;
    });

    const total = Object.values(turnos).reduce((a, b) => a + b, 0);
    const cores = ["#1e88e5", "#43a047", "#fb8c00", "#8e24aa"];

    return Object.entries(turnos).map(([name, population], index) => {
      const pct = total > 0 ? ((population / total) * 100).toFixed(1) : 0;
      return {
        name: `${name} (${pct}%)`,
        population,
        color: cores[index],
        legendFontColor: "#555",
      };
    });
  };

  const dashboardData = processarDadosDashboard();
  const pieData = processarDadosPizza();
  const barData = processarDadosBarras();
  const turnoData = processarDadosTurnos();
  const diasSemanaData = processarDadosDiasSemana();

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(30, 60, 90, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
    decimalPlaces: 0,
    barPercentage: 0.7,
    propsForLabels: { fontSize: 10 },
  };

  const pieChartConfig = {
    color: (opacity = 1) => `rgba(30, 60, 90, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return "Nunca";
    return new Date(timestamp).toLocaleString("pt-BR");
  };

  const pctAtendidas =
    ocorrencias?.length > 0
      ? Math.round(
          (dashboardData.ocorrenciasAtendidas /
            dashboardData.totalOcorrencias) *
            100
        )
      : 0;

  const pctNaoAtendidas = 100 - pctAtendidas;

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={dynamicStyles.container}>
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e88e5" />
          <Text style={dynamicStyles.loadingText}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={atualizarDados}
            colors={["#1e88e5"]}
          />
        }
      >
        <View style={dynamicStyles.header}>
          <View style={dynamicStyles.headerRow}>
            <Text style={dynamicStyles.title}>Dashboard Operacional</Text>
            <TouchableOpacity
              onPress={recarregarDados}
              style={dynamicStyles.syncButton}
            >
              <Ionicons name="refresh" size={24} color="#1e88e5" />
            </TouchableOpacity>
          </View>

          <Text style={dynamicStyles.subtitle}>
            {ocorrencias?.length || 0} ocorrências registradas
          </Text>

          {error && (
            <View style={dynamicStyles.errorBanner}>
              <Ionicons name="warning" size={16} color="#fff" />
              <Text style={dynamicStyles.errorText}>{error}</Text>
            </View>
          )}

          <View style={dynamicStyles.syncInfo}>
            <Ionicons name="time" size={12} color="#666" />
            <Text style={dynamicStyles.syncText}>
              Última sincronização: {formatarData(lastSync)}
            </Text>
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Visão Geral</Text>

          <View style={dynamicStyles.statsContainer}>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>
                {dashboardData.totalOcorrencias}
              </Text>
              <Text style={dynamicStyles.statLabel}>Total de Ocorrências</Text>
            </View>

            <View style={dynamicStyles.statItem}>
              <Text style={[dynamicStyles.statValue, { color: "#fb8c00" }]}>
                {dashboardData.emAndamento}
              </Text>
              <Text style={dynamicStyles.statLabel}>Em Andamento</Text>
            </View>

            <View style={dynamicStyles.statItem}>
              <Text style={[dynamicStyles.statValue, { color: "#43a047" }]}>
                {dashboardData.ocorrenciasAtendidas}
              </Text>
              <Text style={dynamicStyles.statLabel}>Atendidas</Text>
            </View>

            <View style={dynamicStyles.statItem}>
              <Text style={[dynamicStyles.statValue, { color: "#e53935" }]}>
                {dashboardData.naoAtendidas}
              </Text>
              <Text style={dynamicStyles.statLabel}>Não Atendidas</Text>
            </View>

            <View style={[dynamicStyles.statItem, dynamicStyles.fullWidth]}>
              <Text style={dynamicStyles.statValue}>
                {dashboardData.tempoMedioResposta}
              </Text>
              <Text style={dynamicStyles.statLabel}>
                Tempo Médio de Resposta
              </Text>
            </View>
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Taxa de Atendimento</Text>

          <View style={dynamicStyles.rowPercent}>
            <View style={dynamicStyles.percentBox}>
              <Text style={[dynamicStyles.percentValue, { color: "#43a047" }]}>
                {pctAtendidas}%
              </Text>
              <Text style={dynamicStyles.percentLabel}>Atendidas</Text>
            </View>

            <View style={dynamicStyles.percentBox}>
              <Text style={[dynamicStyles.percentValue, { color: "#e53935" }]}>
                {pctNaoAtendidas}%
              </Text>
              <Text style={dynamicStyles.percentLabel}>Não Atendidas</Text>
            </View>
          </View>
        </View>

        {/* Pizza */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Análises</Text>

          <View style={dynamicStyles.chartSection}>
            <Text style={dynamicStyles.chartTitle}>
              Ocorrências por Natureza
            </Text>
            <View style={dynamicStyles.centeredChart}>
              <PieChart
                data={pieData}
                width={ScreenWidth - 40}
                height={220}
                chartConfig={pieChartConfig}
                accessor="population"
                backgroundColor="transparent"
                hasLegend
                absolute
              />
            </View>
          </View>

          {/* Região */}
          <View style={dynamicStyles.chartSection}>
            <Text style={dynamicStyles.chartTitle}>Ocorrências por Região</Text>
            <View style={dynamicStyles.centeredChart}>
              <BarChart
                data={barData}
                width={ScreenWidth - 30}
                height={220}
                chartConfig={chartConfig}
                fromZero
                showBarTops
                withCustomBarColor
                flatColor
                verticalLabelRotation={30}
              />
            </View>
          </View>

          {/* Dias da Semana */}
          <View style={dynamicStyles.chartSection}>
            <Text style={dynamicStyles.chartTitle}>
              Ocorrências por dia da Semana
            </Text>
            <View style={dynamicStyles.centeredChart}>
              <BarChart
                data={diasSemanaData}
                width={ScreenWidth - 30}
                height={220}
                chartConfig={chartConfig}
                fromZero
                showBarTops
                withCustomBarColor
                flatColor
              />
            </View>
          </View>

          {/* Turnos */}
          <View style={dynamicStyles.chartSection}>
            <Text style={dynamicStyles.chartTitle}>Ocorrências por Turno</Text>
            <View style={dynamicStyles.centeredChart}>
              <PieChart
                data={turnoData}
                width={ScreenWidth - 40}
                height={220}
                chartConfig={pieChartConfig}
                accessor="population"
                backgroundColor="transparent"
                absolute
                hasLegend
              />
            </View>
          </View>
        </View>

        <View style={dynamicStyles.infoSection}>
          <Text style={dynamicStyles.infoText}>
            💡 Dados atualizados automaticamente. Puxe para baixo para
            atualizar.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
