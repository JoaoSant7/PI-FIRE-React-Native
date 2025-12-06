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
  Switch,
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

  // ====== ESTADOS DOS CAMPOS ======
  
  // Dados Internos
  const [dataHora, setDataHora] = useState(ocorrencia.dataHora || "");
  const [numeroAviso, setNumeroAviso] = useState(ocorrencia.numeroAviso || "");
  const [diretoria, setDiretoria] = useState(ocorrencia.diretoria || "");
  const [grupamento, setGrupamento] = useState(ocorrencia.grupamento || "");
  const [pontoBase, setPontoBase] = useState(ocorrencia.pontoBase || "");

  // Ocorrência
  const [natureza, setNatureza] = useState(ocorrencia.natureza || "");
  const [grupoOcorrencia, setGrupoOcorrencia] = useState(ocorrencia.grupoOcorrencia || "");
  const [subgrupoOcorrencia, setSubgrupoOcorrencia] = useState(ocorrencia.subgrupoOcorrencia || "");
  const [situacao, setSituacao] = useState(ocorrencia.situacao || ocorrencia.status || "");
  const [horaSaidaQuartel, setHoraSaidaQuartel] = useState(ocorrencia.horaSaidaQuartel || "");
  const [horaLocal, setHoraLocal] = useState(ocorrencia.horaLocal || "");
  const [horaSaidaLocal, setHoraSaidaLocal] = useState(ocorrencia.horaSaidaLocal || "");
  const [motivoNaoAtendida, setMotivoNaoAtendida] = useState(ocorrencia.motivoNaoAtendida || "");
  const [motivoOutro, setMotivoOutro] = useState(ocorrencia.motivoOutro || "");
  const [vitimaSamu, setVitimaSamu] = useState(ocorrencia.vitimaSamu || false);

  // Informações da Vítima
  const [envolvida, setEnvolvida] = useState(ocorrencia.envolvida || false);
  const [sexo, setSexo] = useState(ocorrencia.sexo || "");
  const [idade, setIdade] = useState(ocorrencia.idade || "");
  const [classificacao, setClassificacao] = useState(ocorrencia.classificacao || "");
  const [destino, setDestino] = useState(ocorrencia.destino || "");

  // Viatura e Acionamento
  const [viatura, setViatura] = useState(ocorrencia.viatura || "");
  const [numeroViatura, setNumeroViatura] = useState(ocorrencia.numeroViatura || "");
  const [acionamento, setAcionamento] = useState(ocorrencia.acionamento || "");
  const [localAcionamento, setLocalAcionamento] = useState(ocorrencia.localAcionamento || "");

  // Endereço
  const [municipio, setMunicipio] = useState(ocorrencia.municipio || "");
  const [regiao, setRegiao] = useState(ocorrencia.regiao || "");
  const [bairro, setBairro] = useState(ocorrencia.bairro || "");
  const [tipoLogradouro, setTipoLogradouro] = useState(ocorrencia.tipoLogradouro || "");
  const [ais, setAis] = useState(ocorrencia.ais || "");
  const [logradouro, setLogradouro] = useState(ocorrencia.logradouro || "");
  const [numero, setNumero] = useState(ocorrencia.numero || "");
  const [latitude, setLatitude] = useState(ocorrencia.latitude || "");
  const [longitude, setLongitude] = useState(ocorrencia.longitude || "");

  // Descrição adicional
  const [descricao, setDescricao] = useState(ocorrencia.descricao || "");

  const [saving, setSaving] = useState(false);

  const handleSalvar = async () => {
    // Validações básicas
    if (!natureza.trim() && !grupoOcorrencia.trim()) {
      Alert.alert("Atenção", "Preencha pelo menos a Natureza ou o Grupo da Ocorrência");
      return;
    }

    setSaving(true);

    const dadosAtualizados = {
      // Dados Internos
      dataHora: dataHora.trim(),
      numeroAviso: numeroAviso.trim(),
      diretoria: diretoria.trim(),
      grupamento: grupamento.trim(),
      pontoBase: pontoBase.trim(),

      // Ocorrência
      natureza: natureza.trim(),
      grupoOcorrencia: grupoOcorrencia.trim(),
      subgrupoOcorrencia: subgrupoOcorrencia.trim(),
      situacao: situacao.trim(),
      status: situacao.trim(), // Mantém compatibilidade
      horaSaidaQuartel: horaSaidaQuartel.trim(),
      horaLocal: horaLocal.trim(),
      horaSaidaLocal: horaSaidaLocal.trim(),
      motivoNaoAtendida: motivoNaoAtendida.trim(),
      motivoOutro: motivoOutro.trim(),
      vitimaSamu,

      // Informações da Vítima
      envolvida,
      sexo: sexo.trim(),
      idade: idade.trim(),
      classificacao: classificacao.trim(),
      destino: destino.trim(),

      // Viatura e Acionamento
      viatura: viatura.trim(),
      numeroViatura: numeroViatura.trim(),
      acionamento: acionamento.trim(),
      localAcionamento: localAcionamento.trim(),

      // Endereço
      municipio: municipio.trim(),
      regiao: regiao.trim(),
      bairro: bairro.trim(),
      tipoLogradouro: tipoLogradouro.trim(),
      ais: ais.trim(),
      logradouro: logradouro.trim(),
      numero: numero.trim(),
      latitude: latitude.trim(),
      longitude: longitude.trim(),

      // Descrição
      descricao: descricao.trim(),
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

        <View style={styles.form}>
          {/* ====== SEÇÃO: DADOS INTERNOS ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="business" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Dados Internos</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Data e Hora</Text>
            <TextInput
              style={styles.input}
              value={dataHora}
              onChangeText={setDataHora}
              placeholder="AAAA-MM-DD HH:MM"
              placeholderTextColor="#999"
            />
            <Text style={styles.hint}>Formato: 2024-12-06 14:30</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número do Aviso</Text>
            <TextInput
              style={styles.input}
              value={numeroAviso}
              onChangeText={setNumeroAviso}
              placeholder="Número do chamado"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Diretoria</Text>
            <TextInput
              style={styles.input}
              value={diretoria}
              onChangeText={setDiretoria}
              placeholder="Ex: 1ª Diretoria"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Grupamento</Text>
            <TextInput
              style={styles.input}
              value={grupamento}
              onChangeText={setGrupamento}
              placeholder="Ex: 1º GBM"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Ponto Base</Text>
            <TextInput
              style={styles.input}
              value={pontoBase}
              onChangeText={setPontoBase}
              placeholder="Local da base"
              placeholderTextColor="#999"
            />
          </View>

          {/* ====== SEÇÃO: OCORRÊNCIA ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="warning" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Ocorrência</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Natureza <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={natureza}
              onChangeText={setNatureza}
              placeholder="Ex: Incêndio, Resgate, Acidente..."
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Grupo da Ocorrência</Text>
            <TextInput
              style={styles.input}
              value={grupoOcorrencia}
              onChangeText={setGrupoOcorrencia}
              placeholder="Grupo/Categoria"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Subgrupo da Ocorrência</Text>
            <TextInput
              style={styles.input}
              value={subgrupoOcorrencia}
              onChangeText={setSubgrupoOcorrencia}
              placeholder="Subgrupo/Subcategoria"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Situação/Status</Text>
            <TextInput
              style={styles.input}
              value={situacao}
              onChangeText={setSituacao}
              placeholder="Ex: Atendida, Não Atendida, Cancelada..."
              placeholderTextColor="#999"
            />
            <Text style={styles.hint}>
              Sugestões: Atendida, Não Atendida, Cancelada, Sem Atuação
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hora Saída do Quartel</Text>
            <TextInput
              style={styles.input}
              value={horaSaidaQuartel}
              onChangeText={setHoraSaidaQuartel}
              placeholder="HH:MM"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hora Chegada ao Local</Text>
            <TextInput
              style={styles.input}
              value={horaLocal}
              onChangeText={setHoraLocal}
              placeholder="HH:MM"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hora Saída do Local</Text>
            <TextInput
              style={styles.input}
              value={horaSaidaLocal}
              onChangeText={setHoraSaidaLocal}
              placeholder="HH:MM"
              placeholderTextColor="#999"
            />
          </View>

          {(situacao === "Não Atendida" || situacao === "Sem Atuação") && (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Motivo Não Atendimento</Text>
                <TextInput
                  style={styles.input}
                  value={motivoNaoAtendida}
                  onChangeText={setMotivoNaoAtendida}
                  placeholder="Descreva o motivo"
                  placeholderTextColor="#999"
                />
              </View>

              {motivoNaoAtendida === "Outro" && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Especificar Outro Motivo</Text>
                  <TextInput
                    style={styles.input}
                    value={motivoOutro}
                    onChangeText={setMotivoOutro}
                    placeholder="Especifique o motivo"
                    placeholderTextColor="#999"
                  />
                </View>
              )}
            </>
          )}

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima Socorrida pelo SAMU</Text>
            <Switch
              value={vitimaSamu}
              onValueChange={setVitimaSamu}
              trackColor={{ false: "#ccc", true: "#bc010c" }}
              thumbColor={vitimaSamu ? "#fff" : "#f4f3f4"}
            />
          </View>

          {/* ====== SEÇÃO: INFORMAÇÕES DA VÍTIMA ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="person" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Informações da Vítima</Text>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima Envolvida</Text>
            <Switch
              value={envolvida}
              onValueChange={setEnvolvida}
              trackColor={{ false: "#ccc", true: "#bc010c" }}
              thumbColor={envolvida ? "#fff" : "#f4f3f4"}
            />
          </View>

          {envolvida && (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Sexo</Text>
                <TextInput
                  style={styles.input}
                  value={sexo}
                  onChangeText={setSexo}
                  placeholder="Ex: Masculino, Feminino"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Idade</Text>
                <TextInput
                  style={styles.input}
                  value={idade}
                  onChangeText={setIdade}
                  placeholder="Idade da vítima"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Classificação</Text>
                <TextInput
                  style={styles.input}
                  value={classificacao}
                  onChangeText={setClassificacao}
                  placeholder="Ex: Leve, Moderado, Grave"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Destino</Text>
                <TextInput
                  style={styles.input}
                  value={destino}
                  onChangeText={setDestino}
                  placeholder="Hospital ou local de destino"
                  placeholderTextColor="#999"
                />
              </View>
            </>
          )}

          {/* ====== SEÇÃO: VIATURA E ACIONAMENTO ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="directions-car" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Viatura e Acionamento</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Viatura Empregada</Text>
            <TextInput
              style={styles.input}
              value={viatura}
              onChangeText={setViatura}
              placeholder="Tipo de viatura"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número da Viatura</Text>
            <TextInput
              style={styles.input}
              value={numeroViatura}
              onChangeText={setNumeroViatura}
              placeholder="Identificação da viatura"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Forma de Acionamento</Text>
            <TextInput
              style={styles.input}
              value={acionamento}
              onChangeText={setAcionamento}
              placeholder="Ex: 193, Telefone, Pessoalmente"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Local do Acionamento</Text>
            <TextInput
              style={styles.input}
              value={localAcionamento}
              onChangeText={setLocalAcionamento}
              placeholder="Onde foi feito o chamado"
              placeholderTextColor="#999"
            />
          </View>

          {/* ====== SEÇÃO: ENDEREÇO ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="place" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Endereço da Ocorrência</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Município</Text>
            <TextInput
              style={styles.input}
              value={municipio}
              onChangeText={setMunicipio}
              placeholder="Nome do município"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Região</Text>
            <TextInput
              style={styles.input}
              value={regiao}
              onChangeText={setRegiao}
              placeholder="Ex: Norte, Sul, Centro"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Nome do bairro"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Tipo de Logradouro</Text>
            <TextInput
              style={styles.input}
              value={tipoLogradouro}
              onChangeText={setTipoLogradouro}
              placeholder="Ex: Rua, Avenida, Travessa"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>AIS (Área Integrada de Segurança)</Text>
            <TextInput
              style={styles.input}
              value={ais}
              onChangeText={setAis}
              placeholder="Código AIS"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              value={logradouro}
              onChangeText={setLogradouro}
              placeholder="Nome da rua/avenida"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              value={numero}
              onChangeText={setNumero}
              placeholder="Número do imóvel"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              value={latitude}
              onChangeText={setLatitude}
              placeholder="Ex: -8.0476"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              value={longitude}
              onChangeText={setLongitude}
              placeholder="Ex: -34.8770"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>

          {/* ====== SEÇÃO: DESCRIÇÃO ADICIONAL ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="description" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Descrição Adicional</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Observações</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva detalhes adicionais da ocorrência..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
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