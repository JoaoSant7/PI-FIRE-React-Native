import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function DetalhesOcorrenciaScreen({ route, navigation }) {
  const { ocorrencia } = route.params;

  // Função para obter a cor do status
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

  // Função para formatar data/hora
  const formatarDataHora = (dataHoraString) => {
    if (!dataHoraString) return "Não informado";

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

  // Função para obter texto do status
  const getStatusText = (ocorrencia) => {
    if (ocorrencia.status) return ocorrencia.status;
    if (ocorrencia.situacao) return ocorrencia.situacao;
    return "Registrada";
  };

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

  const handleListarOcorrencias = () => {
    navigation.navigate("ListarOcorrencias");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      <ScrollView style={styles.content}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da Ocorrência</Text>
        </View>

        {/* Card Principal */}
        <View style={styles.card}>
          {/* Status e Tipo */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="info" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Informações Gerais</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: getStatusColor(getStatusText(ocorrencia)),
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(ocorrencia)}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo/Natureza:</Text>
              <Text style={styles.infoValue}>
                {ocorrencia.natureza ||
                  ocorrencia.grupoOcorrencia ||
                  "Não informado"}
              </Text>
            </View>

            {ocorrencia.numeroAviso && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Número do Aviso:</Text>
                <Text style={styles.infoValue}>{ocorrencia.numeroAviso}</Text>
              </View>
            )}
          </View>

          {/* Localização */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="location-on" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Localização</Text>
            </View>

            {ocorrencia.tipoLogradouro && ocorrencia.logradouro && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Endereço:</Text>
                <Text style={styles.infoValue}>
                  {ocorrencia.tipoLogradouro} {ocorrencia.logradouro}
                  {ocorrencia.numero ? `, ${ocorrencia.numero}` : ""}
                </Text>
              </View>
            )}

            {ocorrencia.bairro && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Bairro:</Text>
                <Text style={styles.infoValue}>{ocorrencia.bairro}</Text>
              </View>
            )}

            {ocorrencia.municipio && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Município:</Text>
                <Text style={styles.infoValue}>{ocorrencia.municipio}</Text>
              </View>
            )}

            {ocorrencia.referencia && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Referência:</Text>
                <Text style={styles.infoValue}>{ocorrencia.referencia}</Text>
              </View>
            )}
          </View>

          {/* Datas e Horários */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="access-time" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Datas e Horários</Text>
            </View>

            {ocorrencia.dataHora && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Data/Hora da Ocorrência:</Text>
                <Text style={styles.infoValue}>
                  {formatarDataHora(ocorrencia.dataHora)}
                </Text>
              </View>
            )}

            {ocorrencia.dataRegistro && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Data/Hora do Registro:</Text>
                <Text style={styles.infoValue}>
                  {formatarDataHora(ocorrencia.dataRegistro)}
                </Text>
              </View>
            )}
          </View>

          {/* Informações Adicionais */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="assignment" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Informações Adicionais</Text>
            </View>

            {ocorrencia.grupamento && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Grupamento:</Text>
                <Text style={styles.infoValue}>{ocorrencia.grupamento}</Text>
              </View>
            )}

            {ocorrencia.observacoes && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Observações:</Text>
                <Text style={[styles.infoValue, styles.observacoesText]}>
                  {ocorrencia.observacoes}
                </Text>
              </View>
            )}

            {/* Adicione mais campos conforme necessário */}
            {ocorrencia.id && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>ID:</Text>
                <Text style={styles.infoValue}>{ocorrencia.id}</Text>
              </View>
            )}
          </View>

          {/* Seção para dados específicos do seu sistema */}
          {(ocorrencia.vitimas ||
            ocorrencia.veiculos ||
            ocorrencia.materiais) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="description" size={20} color="#bc010c" />
                <Text style={styles.sectionTitle}>Recursos Utilizados</Text>
              </View>

              {ocorrencia.vitimas && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Vítimas:</Text>
                  <Text style={styles.infoValue}>{ocorrencia.vitimas}</Text>
                </View>
              )}

              {ocorrencia.veiculos && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Veículos:</Text>
                  <Text style={styles.infoValue}>{ocorrencia.veiculos}</Text>
                </View>
              )}

              {ocorrencia.materiais && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Materiais:</Text>
                  <Text style={styles.infoValue}>{ocorrencia.materiais}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Barra Inferior */}
      <BottomNav
        onConfigPress={handleConfiguracoes}
        onHomePress={handleInicio}
        onUserPress={handleUsuario}
        onListPress={handleListarOcorrencias}
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
  },
  header: {
    backgroundColor: "#bc010c",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    paddingTop: StatusBar.currentHeight + 10 || 50,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    margin: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    flex: 1.5,
    textAlign: "right",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  observacoesText: {
    fontStyle: "italic",
    lineHeight: 20,
  },
});
