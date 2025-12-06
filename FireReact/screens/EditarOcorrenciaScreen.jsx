// screens/EditarOcorrenciaScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useOcorrenciasContext } from "../contexts/OcorrenciasContext";
import { createEditarOcorrenciaStyles } from "../styles/EditarOcorrenciaStyles";
import { useFontScale } from "../hooks/useFontScale";

export default function EditarOcorrenciaScreen({ navigation, route }) {
  const { ocorrencia } = route.params;
  const { editarOcorrencia } = useOcorrenciasContext();

  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const styles = React.useMemo(() => createEditarOcorrenciaStyles(scaleFont), [scaleFont]);

  // Estados dos campos
  const [tipo, setTipo] = useState(
    ocorrencia.tipo || ocorrencia.natureza || ocorrencia.grupoOcorrencia || ""
  );
  const [descricao, setDescricao] = useState(ocorrencia.descricao || "");
  const [localizacao, setLocalizacao] = useState(
    ocorrencia.localizacao || ocorrencia.logradouro || ""
  );
  const [status, setStatus] = useState(
    ocorrencia.status || ocorrencia.situacao || ""
  );
  const [regiao, setRegiao] = useState(ocorrencia.regiao || "");
  const [numeroAviso, setNumeroAviso] = useState(ocorrencia.numeroAviso || "");
  const [grupamento, setGrupamento] = useState(ocorrencia.grupamento || "");
  const [saving, setSaving] = useState(false);

  const handleSalvar = async () => {
    // Validações
    if (!tipo.trim()) {
      Alert.alert("Atenção", "O campo 'Tipo' é obrigatório");
      return;
    }

    setSaving(true);

    const dadosAtualizados = {
      tipo: tipo.trim(),
      descricao: descricao.trim(),
      localizacao: localizacao.trim(),
      status: status.trim(),
      regiao: regiao.trim(),
      numeroAviso: numeroAviso.trim(),
      grupamento: grupamento.trim(),
    };

    const result = await editarOcorrencia(ocorrencia.id, dadosAtualizados);

    setSaving(false);

    if (result.success) {
      Alert.alert("Sucesso", "Ocorrência atualizada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert("Erro", result.message || "Falha ao atualizar ocorrência");
    }
  };

  const handleCancelar = () => {
    Alert.alert(
      "Cancelar Edição",
      "Deseja descartar as alterações?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="edit" size={50} color="#bc010c" />
          <Text style={styles.title}>Editar Ocorrência</Text>
          <Text style={styles.subtitle}>
            ID: {ocorrencia.id?.slice(0, 20)}...
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Tipo da Ocorrência */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Tipo da Ocorrência <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={tipo}
              onChangeText={setTipo}
              placeholder="Ex: Incêndio, Resgate, Acidente..."
              placeholderTextColor="#999"
            />
          </View>

          {/* Descrição */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva os detalhes da ocorrência..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Localização */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Localização</Text>
            <TextInput
              style={styles.input}
              value={localizacao}
              onChangeText={setLocalizacao}
              placeholder="Endereço ou ponto de referência"
              placeholderTextColor="#999"
            />
          </View>

          {/* Status */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Status</Text>
            <TextInput
              style={styles.input}
              value={status}
              onChangeText={setStatus}
              placeholder="Ex: Atendida, Não Atendida, Cancelada..."
              placeholderTextColor="#999"
            />
            <Text style={styles.hint}>
              Sugestões: Atendida, Não Atendida, Cancelada, Sem Atuação
            </Text>
          </View>

          {/* Região */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Região</Text>
            <TextInput
              style={styles.input}
              value={regiao}
              onChangeText={setRegiao}
              placeholder="Ex: Norte, Sul, Centro..."
              placeholderTextColor="#999"
            />
          </View>

          {/* Número de Aviso */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número de Aviso</Text>
            <TextInput
              style={styles.input}
              value={numeroAviso}
              onChangeText={setNumeroAviso}
              placeholder="Número do chamado"
              placeholderTextColor="#999"
            />
          </View>

          {/* Grupamento */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Grupamento</Text>
            <TextInput
              style={styles.input}
              value={grupamento}
              onChangeText={setGrupamento}
              placeholder="Unidade responsável"
              placeholderTextColor="#999"
            />
          </View>

          {/* Info de última atualização */}
          {ocorrencia.dataAtualizacao && (
            <View style={styles.infoBox}>
              <Icon name="info-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                Última atualização:{" "}
                {new Date(ocorrencia.dataAtualizacao).toLocaleString("pt-BR")}
              </Text>
            </View>
          )}

          {/* Botões */}
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.buttonDisabled]}
            onPress={handleSalvar}
            disabled={saving}
          >
            <Icon name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>
              {saving ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelar}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}