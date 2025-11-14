// screens/ListarOcorrenciasScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { useOcorrencias } from "../contexts/OcorrenciasContext";

export default function ListarOcorrenciasScreen({ navigation }) {
  const { ocorrencias } = useOcorrencias();

  // Filtro por data (formato: 'YYYY-MM-DD')
  const [dataFiltro, setDataFiltro] = useState("");

  // Função para filtrar por data
  const ocorrenciasFiltradas = ocorrencias.filter((ocorrencia) => {
    if (!dataFiltro) return true;

    // Verifica se a ocorrência tem dataHora e filtra
    if (ocorrencia.dataHora) {
      return ocorrencia.dataHora.startsWith(dataFiltro);
    }

    // Se não tiver dataHora, usa dataRegistro como fallback
    if (ocorrencia.dataRegistro) {
      return ocorrencia.dataRegistro.startsWith(dataFiltro);
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Em Andamento":
      case "aberta":
        return "#FF9800";
      case "Finalizada":
      case "finalizada":
        return "#4CAF50";
      case "registrada":
        return "#2196F3";
      case "Não Atendida":
      case "Sem Atuação":
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
    if (ocorrencia.natureza) return ocorrencia.natureza;
    if (ocorrencia.grupoOcorrencia) return ocorrencia.grupoOcorrencia;
    return "Ocorrência";
  };

  // Função para obter o local
  const getLocalOcorrencia = (ocorrencia) => {
    if (ocorrencia.logradouro) {
      return `${ocorrencia.tipoLogradouro || ""} ${
        ocorrencia.logradouro
      }`.trim();
    }
    if (ocorrencia.bairro) return ocorrencia.bairro;
    if (ocorrencia.municipio) return ocorrencia.municipio;
    return "Local não informado";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      <ScrollView style={styles.content}>
        <View style={styles.placeholderSection}>
          <Icon name="list" size={80} color="#bc010c" />
          <Text style={styles.placeholderTitle}>Ocorrências</Text>
          <Text style={styles.placeholderText}>
            Lista de todas as ocorrências registradas no sistema
          </Text>
          <Text style={styles.contador}>
            {ocorrenciasFiltradas.length} de {ocorrencias.length} ocorrências
          </Text>
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
          ocorrenciasFiltradas.map((ocorrencia, idx) => (
            <TouchableOpacity
              key={ocorrencia.id || `ocorrencia-${idx}`}
              style={styles.ocorrenciaCard}
              onPress={() => {
                // Navegar para a tela de detalhes da ocorrência
                navigation.navigate("DetalhesOcorrencia", { ocorrencia });
              }}
            >
              <View style={styles.ocorrenciaHeader}>
                <Text style={styles.ocorrenciaTipo}>
                  {getTipoOcorrencia(ocorrencia)}
                </Text>
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

              <View style={styles.ocorrenciaInfo}>
                <Icon name="location-on" size={16} color="#666" />
                <Text style={styles.ocorrenciaLocal}>
                  {getLocalOcorrencia(ocorrencia)}
                </Text>
              </View>

              <View style={styles.ocorrenciaInfo}>
                <Icon name="access-time" size={16} color="#666" />
                <Text style={styles.ocorrenciaHora}>
                  {extrairHora(ocorrencia.dataHora || ocorrencia.dataRegistro)}
                </Text>
              </View>

              {/* Informações adicionais */}
              {(ocorrencia.numeroAviso || ocorrencia.grupamento) && (
                <View style={styles.ocorrenciaInfo}>
                  <Icon name="info" size={16} color="#666" />
                  <Text style={styles.ocorrenciaDetalhes}>
                    {[ocorrencia.numeroAviso, ocorrencia.grupamento]
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
                    ocorrencia.dataHora || ocorrencia.dataRegistro
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

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
  ocorrenciaCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  ocorrenciaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  ocorrenciaTipo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
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
});
