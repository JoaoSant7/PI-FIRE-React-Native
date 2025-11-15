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
import { useTheme } from "../contexts/ThemeContext";
import { exportToCSV, exportToPDF } from "../services/exportService";

export default function ListarOcorrenciasScreen({ navigation }) {
  const { ocorrencias, loading, refreshing, atualizarDados } =
    useOcorrenciasContext();
  const { colors, isDark } = useTheme();

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
          <Icon name="file-download" size={24} color={colors.textOnPrimary} />
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

  // Funções da barra inferior
  const handleConfiguracoes = () => navigation.navigate("Configuracoes");
  const handleInicio = () => navigation.navigate("Home");
  const handleUsuario = () =>
    navigation.navigate("Usuario", { email: "email_do_usuario@exemplo.com" });
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
      await exportToPDF(selectedData, colors);
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
        return colors.warning;
      case "finalizada":
      case "atendida":
      case "concluída":
        return colors.success;
      case "registrada":
      case "nova":
        return colors.info;
      case "não atendida":
      case "sem atuação":
      case "cancelada":
        return colors.error;
      default:
        return colors.textSecondary;
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
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.primary} />

      {/* Header de seleção */}
      {selectedOccurrences.length > 0 && (
        <View style={[styles.selectionHeader, { backgroundColor: colors.surface, borderBottomColor: colors.primary }]}> 
          <Text style={[styles.selectionText, { color: colors.primary }]}> 
            {selectedOccurrences.length} ocorrência(s) selecionada(s)
          </Text>
          <View style={styles.selectionActions}>
            <TouchableOpacity
              onPress={toggleSelectAll}
              style={styles.selectionButton}
            >
              <Text style={[styles.selectAllText, { color: colors.primary }]}> {selectedOccurrences.length === ocorrenciasFiltradas.length ? "Desmarcar todas" : "Selecionar todas"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedOccurrences([])}
              style={styles.selectionButton}
            >
              <Text style={[styles.cancelSelectionText, { color: colors.error }]}>Cancelar</Text>
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
              colors={[colors.primary]}
            />
        }
      >
        <View style={[styles.placeholderSection, { backgroundColor: colors.surface }] }>
          <Icon name="list" size={80} color={colors.primary} />
          <Text style={[styles.placeholderTitle, { color: colors.text }]}>Ocorrências</Text>
          <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>Lista de todas as ocorrências registradas no sistema</Text>
          <Text style={[styles.contador, { color: colors.primary }]}>
            {ocorrenciasFiltradas.length} de {ocorrencias.length} ocorrências
            {selectedOccurrences.length > 0 &&
              ` • ${selectedOccurrences.length} selecionadas`}
          </Text>

          {selectedOccurrences.length === 0 && (
            <Text style={[styles.exportHint, { color: colors.textSecondary }]}>Toque longo em uma ocorrência para selecionar para exportação</Text>
          )}
        </View>

        {/* Filtro por data */}
        <View style={[styles.filtroContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }] }>
          <Icon name="calendar-today" size={20} color={colors.primary} />
          <TextInput
            style={[styles.filtroInput, { color: colors.inputText }]}
            placeholder="Filtrar por data (AAAA-MM-DD)"
            value={dataFiltro}
            onChangeText={setDataFiltro}
            placeholderTextColor={colors.inputPlaceholder}
          />
          {dataFiltro ? (
            <TouchableOpacity
              onPress={() => setDataFiltro("")}
              style={styles.limparFiltro}
            >
              <Icon name="clear" size={20} color={colors.inputPlaceholder} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Botão Dashboard */}
        <TouchableOpacity
          style={[styles.dashboardButton, { backgroundColor: colors.primary } ]}
          onPress={handleDashboard}
        >
          <Icon name="dashboard" size={20} color={colors.textOnPrimary} />
          <Text style={[styles.dashboardButtonText, { color: colors.textOnPrimary }]}>Ver Dashboard</Text>
        </TouchableOpacity>

        {/* Lista de ocorrências */}
        {ocorrenciasFiltradas.length === 0 ? (
          <View style={styles.semResultados}>
            <Icon name="search-off" size={60} color={colors.divider} />
            <Text style={[styles.semResultadosText, { color: colors.textSecondary }]}> 
              {dataFiltro
                ? `Nenhuma ocorrência encontrada para ${dataFiltro}`
                : "Nenhuma ocorrência registrada"}
            </Text>
            {ocorrencias.length === 0 && (
              <TouchableOpacity
                style={[styles.novaOcorrenciaButton, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate("NovaOcorrencia")}
              >
                <Text style={[styles.novaOcorrenciaButtonText, { color: colors.textOnPrimary }]}>Registrar Primeira Ocorrência</Text>
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
                  isSelected && { backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 2 },
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
                    <Icon name="check-circle" size={20} color={colors.primary} />
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
                                ? colors.error
                                : getPrioridade(ocorrencia) === "media"
                                ? colors.warning
                                : colors.success,
                          },
                        ]}
                      >
                        <Text style={[styles.prioridadeText, { color: colors.textOnPrimary }]}>
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
                      <Text style={[styles.statusText, { color: colors.textOnPrimary }]}>
                        {getStatusText(ocorrencia)}
                      </Text>
                    </View>
                  </View>

                  {ocorrencia.descricao && (
                    <Text style={[styles.ocorrenciaDescricao, { color: colors.textSecondary }]} numberOfLines={2}>
                      {ocorrencia.descricao}
                    </Text>
                  )}

                  <View style={styles.ocorrenciaInfo}>
                    <Icon name="location-on" size={16} color={colors.textSecondary} />
                    <Text style={[styles.ocorrenciaLocal, { color: colors.textSecondary }]}>
                      {getLocalOcorrencia(ocorrencia)}
                    </Text>
                  </View>

                  <View style={styles.ocorrenciaInfo}>
                    <Icon name="access-time" size={16} color={colors.textSecondary} />
                    <Text style={[styles.ocorrenciaHora, { color: colors.textSecondary }]}>
                      {extrairHora(
                        ocorrencia.dataHora || ocorrencia.dataCriacao
                      )}
                    </Text>
                  </View>

                  {(ocorrencia.regiao ||
                    ocorrencia.numeroAviso ||
                    ocorrencia.grupamento) && (
                    <View style={styles.ocorrenciaInfo}>
                      <Icon name="info" size={16} color={colors.textSecondary} />
                      <Text style={[styles.ocorrenciaDetalhes, { color: colors.textSecondary }]}> {[ocorrencia.regiao, ocorrencia.numeroAviso, ocorrencia.grupamento].filter(Boolean).join(" • ")}</Text>
                    </View>
                  )}

                  <View style={styles.ocorrenciaInfo}>
                    <Icon name="date-range" size={16} color={colors.textSecondary} />
                    <Text style={[styles.ocorrenciaData, { color: colors.textSecondary }]}> {formatarDataHora(ocorrencia.dataHora || ocorrencia.dataCriacao)}</Text>
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
        <View style={[styles.modalContainer, { backgroundColor: colors.backdrop }] }>
          <View style={[styles.modalContent, { backgroundColor: colors.card }] }>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Exportar Ocorrências</Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}> {selectedOccurrences.length > 0 ? `Exportar ${selectedOccurrences.length} ocorrência(s) selecionada(s)` : "Exportar todas as ocorrências visíveis"}</Text>
            <Text style={[styles.modalInfo, { color: colors.textSecondary }]}>A exportação incluirá TODOS os dados detalhados das ocorrências</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.success }]}
                onPress={handleExportCSV}
              >
                <Icon name="table-chart" size={24} color={colors.textOnPrimary} />
                <Text style={[styles.modalButtonText, { color: colors.textOnPrimary }]}>Exportar CSV</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.error }]}
                onPress={handleExportPDF}
              >
                <Icon name="picture-as-pdf" size={24} color={colors.textOnPrimary} />
                <Text style={[styles.modalButtonText, { color: colors.textOnPrimary }]}>Exportar PDF</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setExportModalVisible(false)}
            >
              <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  selectionHeader: {
    padding: 12,
    borderBottomWidth: 1,
    flexDirection: "column",
  },
  selectionText: {
    fontSize: 14,
    
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
    
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelSelectionText: {
    
    fontWeight: "bold",
    fontSize: 14,
  },
  placeholderSection: {
    alignItems: "center",
    paddingVertical: 30,
    borderRadius: 12,
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    
    textAlign: "center",
    paddingHorizontal: 20,
  },
  contador: {
    fontSize: 14,
    
    fontWeight: "600",
    marginTop: 8,
  },
  exportHint: {
    fontSize: 12,
    
    fontStyle: "italic",
    marginTop: 8,
    textAlign: "center",
  },
  filtroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  filtroInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  limparFiltro: {
    padding: 4,
  },
  dashboardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dashboardButtonText: {
    
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  ocorrenciaCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    position: "relative",
  },
  selectedOccurrenceCard: {
    
  },
  // AJUSTE: Indicador de seleção mais para a esquerda
  selectionIndicator: {
    position: "absolute",
    top: 10,
    left: 10, // Alterado de right para left
    zIndex: 1,
  },
  ocorrenciaContent: {
    flex: 1,
    marginLeft: 8, // Adicionado espaço para o indicador
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
    marginBottom: 4,
  },
  prioridadeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  prioridadeText: {
    
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
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  ocorrenciaDescricao: {
    fontSize: 14,
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
    marginLeft: 6,
    flex: 1,
  },
  ocorrenciaHora: {
    fontSize: 14,
    marginLeft: 6,
  },
  ocorrenciaDetalhes: {
    fontSize: 13,
    marginLeft: 6,
    fontStyle: "italic",
    flex: 1,
  },
  ocorrenciaData: {
    fontSize: 12,
    marginLeft: 6,
  },
  semResultados: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  semResultadosText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  novaOcorrenciaButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  novaOcorrenciaButtonText: {
    
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  modalInfo: {
    fontSize: 12,
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
    
  },
  pdfButton: {
    
  },
  modalButtonText: {
    
    fontWeight: "bold",
    marginLeft: 8,
  },
  cancelButton: {
    padding: 12,
  },
  cancelButtonText: {
    
    fontSize: 16,
  },
});
