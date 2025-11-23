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
import styles, { createListarOcorrenciaStyles } from "../styles/ListarOcorrenciaStyles";
import { useFontScale } from "../hooks/useFontScale";

export default function ListarOcorrenciasScreen({ navigation }) {
  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createListarOcorrenciaStyles(scaleFont), [scaleFont]);

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

  // Funções da barra inferior
  const handleInicio = () => navigation.navigate("Home");
  const handleUsuario = () =>
    navigation.navigate("Usuario", { email: "email_do_usuario@exemplo.com" });
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
      await exportToPDF(selectedData);
      setExportModalVisible(false);
      setSelectedOccurrences([]);
      Alert.alert("Sucesso", "PDF exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      Alert.alert("Erro", "Falha ao exportar PDF");
    }
  };

  // Funções auxiliares para exibição - CORRIGIDAS
  const getStatusColor = (status) => {
    if (!status) return null;

    // Normalizar o texto para comparação
    const statusNormalizado = status
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    switch (statusNormalizado) {
      case "atendida":
        return "#4CAF50";
      case "nao atendida":
      case "não atendida":
        return "#F44336";
      case "cancelada":
        return "#757575";
      case "sem atuacao":
      case "sem atuação":
        return "#FF9800";
      default:
        return null;
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

  // FUNÇÃO CORRIGIDA: Mostrar apenas status específicos
  const getStatusText = (ocorrencia) => {
    const status = ocorrencia.status || ocorrencia.situacao || "";

    // Normalizar para comparação (remover acentos)
    const statusNormalizado = status
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Lista dos status que devem ser exibidos (normalizados)
    const statusPermitidos = [
      "atendida",
      "nao atendida",
      "cancelada",
      "sem atuacao",
    ];

    // Verifica se o status atual está na lista de permitidos
    if (statusPermitidos.includes(statusNormalizado)) {
      return status; // Retorna o texto original com acentos
    }

    // Para outros status, não retorna nada (não mostra tag)
    return null;
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

  return (
    <View style={dynamicStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      {/* Header de seleção */}
      {selectedOccurrences.length > 0 && (
        <View style={dynamicStyles.selectionHeader}>
          <Text style={dynamicStyles.selectionText}>
            {selectedOccurrences.length} ocorrência(s) selecionada(s)
          </Text>
          <View style={dynamicStyles.selectionActions}>
            <TouchableOpacity
              onPress={toggleSelectAll}
              style={dynamicStyles.selectionButton}
            >
              <Text style={dynamicStyles.selectAllText}>
                {selectedOccurrences.length === ocorrenciasFiltradas.length
                  ? "Desmarcar todas"
                  : "Selecionar todas"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedOccurrences([])}
              style={dynamicStyles.selectionButton}
            >
              <Text style={dynamicStyles.cancelSelectionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView
        style={dynamicStyles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={atualizarDados}
            colors={["#bc010c"]}
          />
        }
      >
        <View style={dynamicStyles.placeholderSection}>
          <Icon name="list" size={80} color="#bc010c" />
          <Text style={dynamicStyles.placeholderTitle}>Ocorrências</Text>
          <Text style={dynamicStyles.placeholderText}>
            Lista de todas as ocorrências registradas no sistema
          </Text>
          <Text style={dynamicStyles.contador}>
            {ocorrenciasFiltradas.length} de {ocorrencias.length} ocorrências
            {selectedOccurrences.length > 0 &&
              ` • ${selectedOccurrences.length} selecionadas`}
          </Text>

          {selectedOccurrences.length === 0 && (
            <Text style={dynamicStyles.exportHint}>
              Toque longo em uma ocorrência para selecionar para exportação
            </Text>
          )}
        </View>

        {/* Filtro por data */}
        <View style={dynamicStyles.filtroContainer}>
          <Icon name="calendar-today" size={20} color="#bc010c" />
          <TextInput
            style={dynamicStyles.filtroInput}
            placeholder="Filtrar por data (AAAA-MM-DD)"
            value={dataFiltro}
            onChangeText={setDataFiltro}
            placeholderTextColor="#999"
          />
          {dataFiltro ? (
            <TouchableOpacity
              onPress={() => setDataFiltro("")}
              style={dynamicStyles.limparFiltro}
            >
              <Icon name="clear" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Botão Dashboard */}
        <TouchableOpacity
          style={dynamicStyles.dashboardButton}
          onPress={handleDashboard}
        >
          <Icon name="dashboard" size={20} color="#fff" />
          <Text style={dynamicStyles.dashboardButtonText}>Ver Dashboard</Text>
        </TouchableOpacity>

        {/* Lista de ocorrências */}
        {ocorrenciasFiltradas.length === 0 ? (
          <View style={dynamicStyles.semResultados}>
            <Icon name="search-off" size={60} color="#ccc" />
            <Text style={dynamicStyles.semResultadosText}>
              {dataFiltro
                ? `Nenhuma ocorrência encontrada para ${dataFiltro}`
                : "Nenhuma ocorrência registrada"}
            </Text>
            {ocorrencias.length === 0 && (
              <TouchableOpacity
                style={dynamicStyles.novaOcorrenciaButton}
                onPress={handleNovaOcorrencia}
              >
                <Text style={dynamicStyles.novaOcorrenciaButtonText}>
                  Registrar Primeira Ocorrência
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          ocorrenciasFiltradas.map((ocorrencia, idx) => {
            const occurrenceId = ocorrencia.id || `ocorrencia-${idx}`;
            const isSelected = selectedOccurrences.includes(occurrenceId);
            const statusText = getStatusText(ocorrencia);
            const statusColor = getStatusColor(statusText);

            return (
              <TouchableOpacity
                key={occurrenceId}
                style={[
                  dynamicStyles.ocorrenciaCard,
                  isSelected && dynamicStyles.selectedOccurrenceCard,
                ]}
                onPress={() => {
                  navigation.navigate("DetalhesOcorrencia", { ocorrencia });
                }}
                onLongPress={() => handleLongPress(occurrenceId)}
                delayLongPress={500}
              >
                {/* Indicador de seleção */}
                {isSelected && (
                  <View style={dynamicStyles.selectionIndicator}>
                    <Icon name="check-circle" size={20} color="#bc010c" />
                  </View>
                )}

                <View style={dynamicStyles.ocorrenciaContent}>
                  {/* HEADER COM TÍTULO À ESQUERDA E TAG À DIREITA */}
                  <View style={dynamicStyles.ocorrenciaHeader}>
                    <Text style={dynamicStyles.ocorrenciaTipo}>
                      {getTipoOcorrencia(ocorrencia)}
                    </Text>

                    {/* TAG DE STATUS - CANTO SUPERIOR DIREITO */}
                    {statusText && statusColor && (
                      <View
                        style={[
                          dynamicStyles.statusBadge,
                          { backgroundColor: statusColor },
                        ]}
                      >
                        <Text style={dynamicStyles.statusText}>{statusText}</Text>
                      </View>
                    )}
                  </View>

                  {ocorrencia.descricao && (
                    <Text style={dynamicStyles.ocorrenciaDescricao} numberOfLines={2}>
                      {ocorrencia.descricao}
                    </Text>
                  )}

                  <View style={dynamicStyles.ocorrenciaInfo}>
                    <Icon name="location-on" size={16} color="#666" />
                    <Text style={dynamicStyles.ocorrenciaLocal}>
                      {getLocalOcorrencia(ocorrencia)}
                    </Text>
                  </View>

                  <View style={dynamicStyles.ocorrenciaInfo}>
                    <Icon name="access-time" size={16} color="#666" />
                    <Text style={dynamicStyles.ocorrenciaHora}>
                      {extrairHora(
                        ocorrencia.dataHora || ocorrencia.dataCriacao
                      )}
                    </Text>
                  </View>

                  {(ocorrencia.regiao ||
                    ocorrencia.numeroAviso ||
                    ocorrencia.grupamento) && (
                    <View style={dynamicStyles.ocorrenciaInfo}>
                      <Icon name="info" size={16} color="#666" />
                      <Text style={dynamicStyles.ocorrenciaDetalhes}>
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

                  <View style={dynamicStyles.ocorrenciaInfo}>
                    <Icon name="date-range" size={16} color="#666" />
                    <Text style={dynamicStyles.ocorrenciaData}>
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
        <View style={dynamicStyles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            <Text style={dynamicStyles.modalTitle}>Exportar Ocorrências</Text>
            <Text style={dynamicStyles.modalSubtitle}>
              {selectedOccurrences.length > 0
                ? `Exportar ${selectedOccurrences.length} ocorrência(s) selecionada(s)`
                : "Exportar todas as ocorrências visíveis"}
            </Text>
            <Text style={dynamicStyles.modalInfo}>
              A exportação incluirá TODOS os dados detalhados das ocorrências
            </Text>

            <View style={dynamicStyles.modalButtons}>
              <TouchableOpacity
                style={[dynamicStyles.modalButton, dynamicStyles.csvButton]}
                onPress={handleExportCSV}
              >
                <Icon name="table-chart" size={24} color="#fff" />
                <Text style={dynamicStyles.modalButtonText}>Exportar CSV</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[dynamicStyles.modalButton, dynamicStyles.pdfButton]}
                onPress={handleExportPDF}
              >
                <Icon name="picture-as-pdf" size={24} color="#fff" />
                <Text style={dynamicStyles.modalButtonText}>Exportar PDF</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={dynamicStyles.cancelButton}
              onPress={() => setExportModalVisible(false)}
            >
              <Text style={dynamicStyles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Nav */}
      <BottomNav
        onHomePress={handleInicio}
        onUserPress={handleUsuario}
        onNewOccurrencePress={handleNovaOcorrencia}
      />
    </View>
  );
}
