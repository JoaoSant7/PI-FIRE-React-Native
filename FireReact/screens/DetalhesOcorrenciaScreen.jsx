// screens/DetalhesOcorrenciaScreen.js
import React from "react";
import { View, ScrollView, Text, Image, Dimensions } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import styles from "../styles/DetalhesStyles";

export default function DetalhesOcorrenciaScreen({ route, navigation }) {
  const { ocorrencia } = route.params;
  const { width: screenWidth } = Dimensions.get("window");

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

  // Função para formatar valores booleanos
  const formatarBooleano = (valor) => {
    return valor ? "SIM" : "NÃO";
  };

  // Função para verificar se deve mostrar informações de não atendimento
  const mostrarMotivoNaoAtendimento = () => {
    return (
      ocorrencia.situacao === "Não Atendida" ||
      ocorrencia.situacao === "Sem Atuação"
    );
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

  // Função auxiliar para renderizar informações condicionais
  const renderInfo = (label, value, condition = true) => {
    if (!condition || !value) return null;
    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  };

  // Função para renderizar as fotos
  // Função para renderizar as fotos (versão mais robusta)
  const renderFotos = () => {
    // Verifica se existem fotos de diferentes formas
    let fotosArray = [];

    if (ocorrencia.fotos && Array.isArray(ocorrencia.fotos)) {
      fotosArray = ocorrencia.fotos;
    } else if (ocorrencia.foto) {
      // Backup para formato antigo (se houver migração)
      fotosArray = [ocorrencia.foto.uri || ocorrencia.foto];
    }

    if (fotosArray.length === 0) {
      return (
        <View style={styles.noPhotosContainer}>
          <Icon name="photo-camera" size={40} color="#ccc" />
          <Text style={styles.noPhotosText}>
            Não há registro fotográfico desta ocorrência
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.photosScrollView}
      >
        <View style={styles.photosContainer}>
          {fotosArray.map((foto, index) => (
            <Image
              key={index}
              source={{
                uri: typeof foto === "string" ? foto : foto.uri || foto,
              }}
              style={[
                styles.photo,
                { width: screenWidth * 0.8, height: screenWidth * 0.6 },
              ]}
              resizeMode="cover"
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Card Principal */}
        <View style={styles.card}>
          {/* Seção: Dados Internos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="business" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Dados Internos</Text>
            </View>

            {renderInfo("Data e Hora", formatarDataHora(ocorrencia.dataHora))}
            {renderInfo("Número do Aviso", ocorrencia.numeroAviso)}
            {renderInfo("Diretoria", ocorrencia.diretoria)}
            {renderInfo("Grupamento", ocorrencia.grupamento)}
            {renderInfo("Ponto Base", ocorrencia.pontoBase)}
          </View>

          {/* Seção: Ocorrência */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="warning" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Ocorrência</Text>
            </View>

            {renderInfo("Natureza", ocorrencia.natureza)}
            {renderInfo("Grupo da Ocorrência", ocorrencia.grupoOcorrencia)}
            {renderInfo(
              "Subgrupo da Ocorrência",
              ocorrencia.subgrupoOcorrencia
            )}
            {renderInfo("Situação", ocorrencia.situacao)}

            {renderInfo("Hora Saída Quartel", ocorrencia.horaSaidaQuartel)}
            {renderInfo("Hora Chegada Local", ocorrencia.horaLocal)}
            {renderInfo("Hora Saída Local", ocorrencia.horaSaidaLocal)}

            {/* Motivo de não atendimento */}
            {mostrarMotivoNaoAtendimento() && (
              <>
                {renderInfo(
                  "Motivo Não Atendimento",
                  ocorrencia.motivoNaoAtendida
                )}
                {renderInfo(
                  "Outro Motivo",
                  ocorrencia.motivoOutro,
                  ocorrencia.motivoNaoAtendida === "Outro"
                )}
              </>
            )}

            {renderInfo(
              "Vítima Socorrida pelo SAMU",
              formatarBooleano(ocorrencia.vitimaSamu)
            )}
          </View>

          {/* Seção: Informações da Vítima */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="person" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Informações da Vítima</Text>
            </View>

            {renderInfo(
              "Vítima Envolvida",
              formatarBooleano(ocorrencia.envolvida)
            )}
            {renderInfo("Sexo", ocorrencia.sexo)}
            {renderInfo("Idade", ocorrencia.idade)}
            {renderInfo("Classificação", ocorrencia.classificacao)}
            {renderInfo("Destino", ocorrencia.destino)}
          </View>

          {/* Seção: Viatura e Acionamento */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="directions-car" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Viatura e Acionamento</Text>
            </View>

            {renderInfo("Viatura Empregada", ocorrencia.viatura)}
            {renderInfo("Número da Viatura", ocorrencia.numeroViatura)}
            {renderInfo("Forma de Acionamento", ocorrencia.acionamento)}
            {renderInfo("Local do Acionamento", ocorrencia.localAcionamento)}
          </View>

          {/* Seção: Endereço */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="place" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Endereço da Ocorrência</Text>
            </View>

            {renderInfo("Município", ocorrencia.municipio)}
            {renderInfo("Região", ocorrencia.regiao)}
            {renderInfo("Bairro", ocorrencia.bairro)}
            {renderInfo("Tipo de Logradouro", ocorrencia.tipoLogradouro)}
            {renderInfo("AIS", ocorrencia.ais)}
            {renderInfo("Logradouro", ocorrencia.logradouro)}
            {renderInfo("Latitude", ocorrencia.latitude)}
            {renderInfo("Longitude", ocorrencia.longitude)}
          </View>

          {/* NOVA SEÇÃO: Registro Fotográfico */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="photo-camera" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Registro Fotográfico</Text>
            </View>

            {renderFotos()}
          </View>

          {/* Seção: Informações do Sistema */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="info" size={20} color="#bc010c" />
              <Text style={styles.sectionTitle}>Informações do Sistema</Text>
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

            {renderInfo("ID", ocorrencia.id)}
            {renderInfo(
              "Data de Registro",
              formatarDataHora(ocorrencia.dataRegistro)
            )}
          </View>
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
