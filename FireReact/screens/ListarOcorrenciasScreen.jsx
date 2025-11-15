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

export default function ListarOcorrenciasScreen({ navigation }) {
  const { ocorrencias, loading, refreshing, atualizarDados } =
    useOcorrenciasContext();

  // Filtro por data (formato: 'YYYY-MM-DD')
  const [dataFiltro, setDataFiltro] = useState("");
  const [selectedOccurrences, setSelectedOccurrences] = useState([]);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  // Adicionar botão de exportação no header
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

  // Função para filtrar por data
  const ocorrenciasFiltradas = ocorrencias.filter((ocorrencia) => {
    if (!dataFiltro) return true;

    // Verifica se a ocorrência tem dataHora e filtra
    if (ocorrencia.dataHora) {
      return ocorrencia.dataHora.startsWith(dataFiltro);
    }

    // Se não tiver dataHora, usa dataCriacao como fallback
    if (ocorrencia.dataCriacao) {
      return ocorrencia.dataCriacao.startsWith(dataFiltro);
    }

    return false;
  });

  // Funções para a barra inferior
  const handleConfiguracoes = () => {
    navigation.navigate("Configuracoes");
  };

  const handleInicio = () => {
    navigation.navigate("Home");
  };

  const handleUsuario = () => {
    navigation.navigate("Usuario", { email: "email_do_usuario@exemplo.com" });
  };

  const handleDashboard = () => {
    navigation.navigate("Dashboard");
  };

  // Funções de seleção para exportação (apenas toque longo)
  const handleLongPress = (id) => {
    Vibration.vibrate(50); // Feedback tátil
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

  // Funções de exportação
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
      // Usar TODOS os dados detalhados da ocorrência para exportação
      const formattedData = selectedData.map((occ) => ({
        // Informações básicas
        id: occ.id || `ocorrencia-${ocorrenciasFiltradas.indexOf(occ)}`,
        data: occ.dataHora
          ? occ.dataHora.split("T")[0]
          : occ.dataCriacao
          ? occ.dataCriacao.split("T")[0]
          : "N/A",
        hora: occ.dataHora
          ? occ.dataHora.split("T")[1]?.substring(0, 5)
          : occ.dataCriacao
          ? occ.dataCriacao.split("T")[1]?.substring(0, 5)
          : "N/A",
        tipo: getTipoOcorrencia(occ),
        endereco: getLocalOcorrencia(occ),
        status: getStatusText(occ),
        prioridade: getPrioridade(occ),

        // Descrição detalhada
        descricao: occ.descricao || "Sem descrição",

        // Localização completa
        logradouro: occ.logradouro || "",
        tipoLogradouro: occ.tipoLogradouro || "",
        numero: occ.numero || "",
        bairro: occ.bairro || "",
        municipio: occ.municipio || "",
        regiao: occ.regiao || "",

        // Informações operacionais
        numeroAviso: occ.numeroAviso || "",
        grupamento: occ.grupamento || "",
        situacao: occ.situacao || "",
        natureza: occ.natureza || "",
        grupoOcorrencia: occ.grupoOcorrencia || "",

        // Metadados
        dataCriacao: occ.dataCriacao || "",
        dataAtualizacao: occ.dataAtualizacao || "",
      }));

      await exportToCSV(formattedData);
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
      // Usar TODOS os dados detalhados da ocorrência para exportação
      const formattedData = selectedData.map((occ) => ({
        // Informações básicas
        id: occ.id || `ocorrencia-${ocorrenciasFiltradas.indexOf(occ)}`,
        data: occ.dataHora
          ? occ.dataHora.split("T")[0]
          : occ.dataCriacao
          ? occ.dataCriacao.split("T")[0]
          : "N/A",
        hora: occ.dataHora
          ? occ.dataHora.split("T")[1]?.substring(0, 5)
          : occ.dataCriacao
          ? occ.dataCriacao.split("T")[1]?.substring(0, 5)
          : "N/A",
        tipo: getTipoOcorrencia(occ),
        endereco: getLocalOcorrencia(occ),
        status: getStatusText(occ),
        prioridade: getPrioridade(occ),

        // Descrição detalhada
        descricao: occ.descricao || "Sem descrição",

        // Localização completa
        logradouro: occ.logradouro || "",
        tipoLogradouro: occ.tipoLogradouro || "",
        numero: occ.numero || "",
        bairro: occ.bairro || "",
        municipio: occ.municipio || "",
        regiao: occ.regiao || "",

        // Informações operacionais
        numeroAviso: occ.numeroAviso || "",
        grupamento: occ.grupamento || "",
        situacao: occ.situacao || "",
        natureza: occ.natureza || "",
        grupoOcorrencia: occ.grupoOcorrencia || "",

        // Metadados
        dataCriacao: occ.dataCriacao || "",
        dataAtualizacao: occ.dataAtualizacao || "",
      }));

      await exportToPDF(formattedData);
      setExportModalVisible(false);
      setSelectedOccurrences([]);
      Alert.alert("Sucesso", "PDF exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      Alert.alert("Erro", "Falha ao exportar PDF");
    }
  };

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

  // Função para formatar a data/hora para exibição
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

  // Função para extrair apenas a hora
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

  // Função para obter texto do status
  const getStatusText = (ocorrencia) => {
    if (ocorrencia.status) return ocorrencia.status;
    if (ocorrencia.situacao) return ocorrencia.situacao;
    return "Registrada";
  };

  // Função para obter o tipo/natureza da ocorrência
  const getTipoOcorrencia = (ocorrencia) => {
    if (ocorrencia.tipo) return ocorrencia.tipo;
    if (ocorrencia.natureza) return ocorrencia.natureza;
    if (ocorrencia.grupoOcorrencia) return ocorrencia.grupoOcorrencia;
    return "Ocorrência";
  };

  // Função para obter o local
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

  // Função para obter a prioridade
  const getPrioridade = (ocorrencia) => {
    if (ocorrencia.prioridade) return ocorrencia.prioridade;
    return "media";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      {/* Header de seleção - Só aparece quando há ocorrências selecionadas */}
      {selectedOccurrences.length > 0 && (
        <View style={styles.selectionHeader}>
          <Text style={styles.selectionText}>
            {selectedOccurrences.length} ocorrência(s) selecionada(s) para
            exportação
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

          {/* Instrução para exportação */}
          {selectedOccurrences.length === 0 && (
            <Text style={styles.exportHint}>
              Toque longo em uma ocorrência para selecionar para exportação
            </Text>
          )}
        </View>

        {/* Campo de filtro por data */}
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

        {/* Botão para Dashboard */}
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
                onPress={() => navigation.navigate("NovaOcorrencia")}
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
                  // Toque simples: navega para detalhes (comportamento original)
                  navigation.navigate("DetalhesOcorrencia", { ocorrencia });
                }}
                onLongPress={() => {
                  // Toque longo: seleciona para exportação
                  handleLongPress(occurrenceId);
                }}
                delayLongPress={500} // Delay de 500ms para toque longo
              >
                {/* Indicador de seleção (apenas visual) */}
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

                  {/* Informações adicionais */}
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

                  {/* Data completa */}
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
              A exportação incluirá todos os dados detalhados das ocorrências
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

      {/* Barra Inferior */}
      <BottomNav
        onConfigPress={handleConfiguracoes}
        onHomePress={handleInicio}
        onUserPress={handleUsuario}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  selectionHeader: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2196f3",
    flexDirection: "column",
  },
  selectionText: {
    fontSize: 14,
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 8,
  },
  selectionActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectionButton: {
    padding: 4,
  },
  selectAllText: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelSelectionText: {
    color: "#f44336",
    fontWeight: "bold",
    fontSize: 14,
  },
  placeholderSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  contador: {
    fontSize: 14,
    color: "#bc010c",
    fontWeight: "600",
    marginTop: 8,
  },
  exportHint: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 8,
    textAlign: "center",
  },
  filtroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filtroInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  limparFiltro: {
    padding: 4,
  },
  dashboardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bc010c",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dashboardButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  ocorrenciaCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    position: "relative", // Para o indicador de seleção
  },
  selectedOccurrenceCard: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
    borderWidth: 2,
  },
  selectionIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  ocorrenciaContent: {
    flex: 1,
  },
  ocorrenciaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  ocorrenciaTipoContainer: {
    flex: 1,
    marginRight: 10,
  },
  ocorrenciaTipo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  prioridadeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  prioridadeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  ocorrenciaDescricao: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 18,
  },
  ocorrenciaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ocorrenciaLocal: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
    flex: 1,
  },
  ocorrenciaHora: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  ocorrenciaDetalhes: {
    fontSize: 13,
    color: "#888",
    marginLeft: 6,
    fontStyle: "italic",
    flex: 1,
  },
  ocorrenciaData: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
  },
  semResultados: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  semResultadosText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  novaOcorrenciaButton: {
    backgroundColor: "#bc010c",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  novaOcorrenciaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  modalInfo: {
    fontSize: 12,
    color: "#888",
    marginBottom: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  csvButton: {
    backgroundColor: "#4CAF50",
  },
  pdfButton: {
    backgroundColor: "#f44336",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  cancelButton: {
    padding: 12,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
