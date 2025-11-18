// screens/ListarOcorrenciasScreen.js
import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  RefreshControl,
  Modal,
  Alert,
  Vibration,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { useOcorrenciasContext } from "../contexts/OcorrenciasContext";
import { exportToCSV, exportToPDF } from "../services/exportService";
import styles from "../styles/ListarOcorrenciaStyles";

export default function ListarOcorrenciasScreen({ navigation }) {
  const { ocorrencias, loading, refreshing, atualizarDados } =
    useOcorrenciasContext();

  const [dataFiltro, setDataFiltro] = useState("");
  const [selectedOccurrences, setSelectedOccurrences] = useState([]);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setExportModalVisible(true)}
          style={{ marginRight: 15 }}
        >
          <Icon name="file-download" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const ocorrenciasFiltradas = ocorrencias.filter((ocorrencia) => {
    if (!dataFiltro) return true;
    if (ocorrencia.dataHora) {
      return ocorrencia.dataHora.startsWith(dataFiltro);
    }
    if (ocorrencia.dataCriacao) {
      return ocorrencia.dataCriacao.startsWith(dataFiltro);
    }
    return false;
  });

  // Funções da barra inferior - CORRIGIDAS
  const handleInicio = () => navigation.navigate("Home");
  const handleUsuario = () =>
    navigation.navigate("Usuario", { email: "email_do_usuario@exemplo.com" });

  // FUNÇÃO ADICIONADA: Navegação para Nova Ocorrência
  const handleNovaOcorrencia = () => {
    console.log("🔄 Navegando para Nova Ocorrência...");
    navigation.navigate("NovaOcorrencia");
  };

  const handleDashboard = () => navigation.navigate("Dashboard");

  // Funções de seleção
  const handleLongPress = (id) => {
    Vibration.vibrate(50);
    toggleOccurrenceSelection(id);
  };

  const toggleOccurrenceSelection = (id) => {
    setSelectedOccurrences((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOccurrences.length === ocorrenciasFiltradas.length) {
      setSelectedOccurrences([]);
    } else {
      setSelectedOccurrences(
        ocorrenciasFiltradas.map(
          (occ) => occ.id || `ocorrencia-${ocorrenciasFiltradas.indexOf(occ)}`
        )
      );
    }
  };

  // Funções de exportação - USANDO DADOS COMPLETOS
  const handleExportCSV = async () => {
    const selectedData =
      selectedOccurrences.length > 0
        ? ocorrenciasFiltradas.filter((occ) =>
            selectedOccurrences.includes(
              occ.id || `ocorrencia-${ocorrenciasFiltradas.indexOf(occ)}`
            )
          )
        : ocorrenciasFiltradas;

    if (selectedData.length === 0) {
      Alert.alert("Aviso", "Não há ocorrências para exportar");
      return;
    }

    try {
      // Usar os dados COMPLETOS da ocorrência (igual aos detalhes)
      await exportToCSV(selectedData);
      setExportModalVisible(false);
      setSelectedOccurrences([]);
      Alert.alert("Sucesso", "CSV exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      Alert.alert("Erro", "Falha ao exportar CSV");
    }
  };

  const handleExportPDF = async () => {
    const selectedData =
      selectedOccurrences.length > 0
        ? ocorrenciasFiltradas.filter((occ) =>
            selectedOccurrences.includes(
              occ.id || `ocorrencia-${ocorrenciasFiltradas.indexOf(occ)}`
            )
          )
        : ocorrenciasFiltradas;

    if (selectedData.length === 0) {
      Alert.alert("Aviso", "Não há ocorrências para exportar");
      return;
    }

    try {
      // Usar os dados COMPLETOS da ocorrência (igual aos detalhes)
      await exportToPDF(selectedData);
      setExportModalVisible(false);
      setSelectedOccurrences([]);
      Alert.alert("Sucesso", "PDF exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      Alert.alert("Erro", "Falha ao exportar PDF");
    }
  };

  // Funções auxiliares para exibição
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "em andamento":
      case "aberta":
      case "pendente":
      case "em_andamento":
        return "#FF9800";
      case "finalizada":
      case "atendida":
      case "concluída":
        return "#4CAF50";
      case "registrada":
      case "nova":
        return "#2196F3";
      case "não atendida":
      case "sem atuação":
      case "cancelada":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const formatarDataHora = (dataHoraString) => {
    if (!dataHoraString) return "Data não informada";
    try {
      const data = new Date(dataHoraString);
      return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Data inválida";
    }
  };

  const extrairHora = (dataHoraString) => {
    if (!dataHoraString) return "";
    try {
      const data = new Date(dataHoraString);
      return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "";
    }
  };

  const getStatusText = (ocorrencia) => {
    if (ocorrencia.status) return ocorrencia.status;
    if (ocorrencia.situacao) return ocorrencia.situacao;
    return "Registrada";
  };

  const getTipoOcorrencia = (ocorrencia) => {
    if (ocorrencia.tipo) return ocorrencia.tipo;
    if (ocorrencia.natureza) return ocorrencia.natureza;
    if (ocorrencia.grupoOcorrencia) return ocorrencia.grupoOcorrencia;
    return "Ocorrência";
  };

  const getLocalOcorrencia = (ocorrencia) => {
    if (ocorrencia.localizacao) return ocorrencia.localizacao;
    if (ocorrencia.logradouro) {
      return `${ocorrencia.tipoLogradouro || ""} ${ocorrencia.logradouro}${
        ocorrencia.numero ? `, ${ocorrencia.numero}` : ""
      }`.trim();
    }
    if (ocorrencia.bairro) return ocorrencia.bairro;
    if (ocorrencia.municipio) return ocorrencia.municipio;
    return "Local não informado";
  };

  const getPrioridade = (ocorrencia) => {
    if (ocorrencia.prioridade) return ocorrencia.prioridade;
    return "media";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      {/* Header de seleção */}
      {selectedOccurrences.length > 0 && (
        <View style={styles.selectionHeader}>
          <Text style={styles.selectionText}>
            {selectedOccurrences.length} ocorrência(s) selecionada(s)
          </Text>
          <View style={styles.selectionActions}>
            <TouchableOpacity
              onPress={toggleSelectAll}
              style={styles.selectionButton}
            >
              <Text style={styles.selectAllText}>
                {selectedOccurrences.length === ocorrenciasFiltradas.length
                  ? "Desmarcar todas"
                  : "Selecionar todas"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedOccurrences([])}
              style={styles.selectionButton}
            >
              <Text style={styles.cancelSelectionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={atualizarDados}
            colors={["#bc010c"]}
          />
        }
      >
        <View style={styles.placeholderSection}>
          <Icon name="list" size={80} color="#bc010c" />
          <Text style={styles.placeholderTitle}>Ocorrências</Text>
          <Text style={styles.placeholderText}>
            Lista de todas as ocorrências registradas no sistema
          </Text>
          <Text style={styles.contador}>
            {ocorrenciasFiltradas.length} de {ocorrencias.length} ocorrências
            {selectedOccurrences.length > 0 &&
              ` • ${selectedOccurrences.length} selecionadas`}
          </Text>

          {selectedOccurrences.length === 0 && (
            <Text style={styles.exportHint}>
              Toque longo em uma ocorrência para selecionar para exportação
            </Text>
          )}
        </View>

        {/* Filtro por data */}
        <View style={styles.filtroContainer}>
          <Icon name="calendar-today" size={20} color="#bc010c" />
          <TextInput
            style={styles.filtroInput}
            placeholder="Filtrar por data (AAAA-MM-DD)"
            value={dataFiltro}
            onChangeText={setDataFiltro}
            placeholderTextColor="#999"
          />
          {dataFiltro ? (
            <TouchableOpacity
              onPress={() => setDataFiltro("")}
              style={styles.limparFiltro}
            >
              <Icon name="clear" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Botão Dashboard */}
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={handleDashboard}
        >
          <Icon name="dashboard" size={20} color="#fff" />
          <Text style={styles.dashboardButtonText}>Ver Dashboard</Text>
        </TouchableOpacity>

        {/* Lista de ocorrências */}
        {ocorrenciasFiltradas.length === 0 ? (
          <View style={styles.semResultados}>
            <Icon name="search-off" size={60} color="#ccc" />
            <Text style={styles.semResultadosText}>
              {dataFiltro
                ? `Nenhuma ocorrência encontrada para ${dataFiltro}`
                : "Nenhuma ocorrência registrada"}
            </Text>
            {ocorrencias.length === 0 && (
              <TouchableOpacity
                style={styles.novaOcorrenciaButton}
                onPress={handleNovaOcorrencia} // Usando a mesma função
              >
                <Text style={styles.novaOcorrenciaButtonText}>
                  Registrar Primeira Ocorrência
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          ocorrenciasFiltradas.map((ocorrencia, idx) => {
            const occurrenceId = ocorrencia.id || `ocorrencia-${idx}`;
            const isSelected = selectedOccurrences.includes(occurrenceId);

            return (
              <TouchableOpacity
                key={occurrenceId}
                style={[
                  styles.ocorrenciaCard,
                  isSelected && styles.selectedOccurrenceCard,
                ]}
                onPress={() => {
                  navigation.navigate("DetalhesOcorrencia", { ocorrencia });
                }}
                onLongPress={() => handleLongPress(occurrenceId)}
                delayLongPress={500}
              >
                {/* Indicador de seleção - POSICIONADO CORRETAMENTE */}
                {isSelected && (
                  <View style={styles.selectionIndicator}>
                    <Icon name="check-circle" size={20} color="#bc010c" />
                  </View>
                )}

                <View style={styles.ocorrenciaContent}>
                  <View style={styles.ocorrenciaHeader}>
                    <View style={styles.ocorrenciaTipoContainer}>
                      <Text style={styles.ocorrenciaTipo}>
                        {getTipoOcorrencia(ocorrencia)}
                      </Text>
                      <View
                        style={[
                          styles.prioridadeBadge,
                          {
                            backgroundColor:
                              getPrioridade(ocorrencia) === "alta"
                                ? "#ff4444"
                                : getPrioridade(ocorrencia) === "media"
                                ? "#ffaa00"
                                : "#44ff44",
                          },
                        ]}
                      >
                        <Text style={styles.prioridadeText}>
                          {getPrioridade(ocorrencia).toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusColor(
                            getStatusText(ocorrencia)
                          ),
                        },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {getStatusText(ocorrencia)}
                      </Text>
                    </View>
                  </View>

                  {ocorrencia.descricao && (
                    <Text style={styles.ocorrenciaDescricao} numberOfLines={2}>
                      {ocorrencia.descricao}
                    </Text>
                  )}

                  <View style={styles.ocorrenciaInfo}>
                    <Icon name="location-on" size={16} color="#666" />
                    <Text style={styles.ocorrenciaLocal}>
                      {getLocalOcorrencia(ocorrencia)}
                    </Text>
                  </View>

                  <View style={styles.ocorrenciaInfo}>
                    <Icon name="access-time" size={16} color="#666" />
                    <Text style={styles.ocorrenciaHora}>
                      {extrairHora(
                        ocorrencia.dataHora || ocorrencia.dataCriacao
                      )}
                    </Text>
                  </View>

                  {(ocorrencia.regiao ||
                    ocorrencia.numeroAviso ||
                    ocorrencia.grupamento) && (
                    <View style={styles.ocorrenciaInfo}>
                      <Icon name="info" size={16} color="#666" />
                      <Text style={styles.ocorrenciaDetalhes}>
                        {[
                          ocorrencia.regiao,
                          ocorrencia.numeroAviso,
                          ocorrencia.grupamento,
                        ]
                          .filter(Boolean)
                          .join(" • ")}
                      </Text>
                    </View>
                  )}

                  <View style={styles.ocorrenciaInfo}>
                    <Icon name="date-range" size={16} color="#666" />
                    <Text style={styles.ocorrenciaData}>
                      {formatarDataHora(
                        ocorrencia.dataHora || ocorrencia.dataCriacao
                      )}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Modal de Exportação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={exportModalVisible}
        onRequestClose={() => setExportModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Exportar Ocorrências</Text>
            <Text style={styles.modalSubtitle}>
              {selectedOccurrences.length > 0
                ? `Exportar ${selectedOccurrences.length} ocorrência(s) selecionada(s)`
                : "Exportar todas as ocorrências visíveis"}
            </Text>
            <Text style={styles.modalInfo}>
              A exportação incluirá TODOS os dados detalhados das ocorrências
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.csvButton]}
                onPress={handleExportCSV}
              >
                <Icon name="table-chart" size={24} color="#fff" />
                <Text style={styles.modalButtonText}>Exportar CSV</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.pdfButton]}
                onPress={handleExportPDF}
              >
                <Icon name="picture-as-pdf" size={24} color="#fff" />
                <Text style={styles.modalButtonText}>Exportar PDF</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setExportModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* BOTTOM NAV CORRIGIDO - COM A FUNÇÃO DE NOVA OCORRÊNCIA */}
      <BottomNav
        onHomePress={handleInicio}
        onUserPress={handleUsuario}
        onNewOccurrencePress={handleNovaOcorrencia} // CORREÇÃO AQUI
      />
    </View>
  );
}
