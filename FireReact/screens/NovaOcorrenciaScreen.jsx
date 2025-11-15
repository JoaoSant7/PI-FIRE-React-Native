// screens/NovaOcorrenciaScreen.js
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { REGIOES } from "../constants/pickerData";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Switch,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Import dos componentes
import Section from "../components/Section";
import InputGroup from "../components/InputGroup";
import TimeInput from "../components/TimeInput";
import DatePickerInput from "../components/DatePickerInput";
import PickerInput from "../components/PickerInput";
import TextInput from "../components/TextInput";

// Import do contexto CORRIGIDO
import { useOcorrenciasContext } from "../contexts/OcorrenciasContext";

// Import dos dados dos pickers
import {
  GRUPAMENTOS,
  NATUREZAS,
  GRUPOS_OCORRENCIA,
  SUBGRUPOS_OCORRENCIA,
  SITUACOES,
  SEXOS,
  CLASSIFICACOES,
  DESTINOS,
  ACIONAMENTOS,
  TIPOS_LOGRADOURO,
} from "../constants/pickerData";

// Constantes para os motivos de não atendimento/sem atuação
const MOTIVOS_NAO_ATENDIMENTO = [
  { label: "Selecione o motivo de não atendimento", value: "" },
  { label: "Vítima Socorrida pelo Samu", value: "Vítima Socorrida pelo Samu" },
  {
    label: "Vítima Socorrida pelos Populares",
    value: "Vítima Socorrida pelos Populares",
  },
  { label: "Recusou Atendimento", value: "Recusou Atendimento" },
  { label: "Outro", value: "Outro" },
];

// Função para gerar o número do aviso no formato YYYYMMDDHHMMSS + sufixo
const gerarNumeroAviso = () => {
  const agora = new Date();

  // Formata cada componente da data/hora para 2 dígitos
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  // Gera um sufixo aleatório de 4 dígitos (entre 1000 e 9999)
  const sufixo = Math.floor(1000 + Math.random() * 9000);

  // Retorna no formato: YYYYMMDDHHMMSS + sufixo (18 dígitos)
  return `${ano}${mes}${dia}${horas}${minutos}${segundos}${sufixo}`;
};

// Função de validação separada para melhor organização
const validateRequiredFields = (formData, dataHora) => {
  const camposObrigatorios = [
    { campo: "Data e Hora", preenchido: dataHora !== null, valor: dataHora },
    {
      campo: "Diretoria",
      preenchido: !!formData.diretoria?.trim(),
      valor: formData.diretoria,
    },
    {
      campo: "Grupamento",
      preenchido: !!formData.grupamento?.trim(),
      valor: formData.grupamento,
    },
    {
      campo: "Ponto Base",
      preenchido: !!formData.pontoBase?.trim(),
      valor: formData.pontoBase,
    },
    {
      campo: "Natureza da Ocorrência",
      preenchido: !!formData.natureza?.trim(),
      valor: formData.natureza,
    },
    {
      campo: "Grupo da Ocorrência",
      preenchido: !!formData.grupoOcorrencia?.trim(),
      valor: formData.grupoOcorrencia,
    },
    {
      campo: "Subgrupo da Ocorrência",
      preenchido: !!formData.subgrupoOcorrencia?.trim(),
      valor: formData.subgrupoOcorrencia,
    },
    {
      campo: "Situação da Ocorrência",
      preenchido: !!formData.situacao?.trim(),
      valor: formData.situacao,
    },
    {
      campo: "Saída do Quartel",
      preenchido: !!formData.horaSaidaQuartel?.trim(),
      valor: formData.horaSaidaQuartel,
    },
    {
      campo: "Chegada no Local",
      preenchido: !!formData.horaLocal?.trim(),
      valor: formData.horaLocal,
    },
    {
      campo: "Saída do Local",
      preenchido: !!formData.horaSaidaLocal?.trim(),
      valor: formData.horaSaidaLocal,
    },
    {
      campo: "Município",
      preenchido: !!formData.municipio?.trim(),
      valor: formData.municipio,
    },
    {
      campo: "Região",
      preenchido: !!formData.regiao?.trim(),
      valor: formData.regiao,
    },
    {
      campo: "Tipo de Logradouro",
      preenchido: !!formData.tipoLogradouro?.trim(),
      valor: formData.tipoLogradouro,
    },
    {
      campo: "Logradouro",
      preenchido: !!formData.logradouro?.trim(),
      valor: formData.logradouro,
    },
  ];

  return camposObrigatorios.filter((campo) => !campo.preenchido);
};

const NovaOcorrenciaScreen = ({ navigation }) => {
  // Hook do contexto CORRIGIDO
  const { adicionarOcorrencia } = useOcorrenciasContext();

  // Estado principal do formulário
  const [formData, setFormData] = useState({
    // Dados Internos - númeroAviso será gerado automaticamente
    numeroAviso: gerarNumeroAviso(), // GERA AUTOMATICAMENTE AO INICIAR
    diretoria: "DIM",
    grupamento: "",
    pontoBase: "",

    // Ocorrência
    natureza: "",
    grupoOcorrencia: "",
    subgrupoOcorrencia: "",
    situacao: "",
    horaSaidaQuartel: "",
    horaLocal: "",
    horaSaidaLocal: "",
    motivoNaoAtendida: "",
    motivoOutro: "",
    vitimaSamu: false,

    // Vítima
    envolvida: false,
    sexo: "",
    idade: "",
    classificacao: "",
    destino: "",

    // Viatura
    viatura: "",
    numeroViatura: "",
    acionamento: "",
    localAcionamento: "",

    // Endereço
    municipio: "",
    regiao: "",
    bairro: "",
    tipoLogradouro: "",
    ais: "",
    logradouro: "",
    latitude: "",
    longitude: "",
  });

  const [dataHora, setDataHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Efeito para atualizar o número do aviso quando a data/hora mudar
  useEffect(() => {
    // Atualiza o número do aviso quando a data/hora principal for alterada
    setFormData((prev) => ({
      ...prev,
      numeroAviso: gerarNumeroAviso(),
    }));
  }, [dataHora]);

  // Função para atualizar o formData
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função para lidar com mudança de data
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataHora(selectedDate);
    }
  };

  // Validação do formulário - ATUALIZADA
  const validateForm = () => {
    // Validação do formato de hora
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    if (
      formData.horaSaidaQuartel &&
      !timeRegex.test(formData.horaSaidaQuartel)
    ) {
      Alert.alert(
        "Formato Inválido",
        "O formato da hora de saída do quartel deve ser HH:MM:SS",
        [{ text: "OK" }]
      );
      return false;
    }

    if (formData.horaLocal && !timeRegex.test(formData.horaLocal)) {
      Alert.alert(
        "Formato Inválido",
        "O formato da hora de chegada no local deve ser HH:MM:SS",
        [{ text: "OK" }]
      );
      return false;
    }

    if (formData.horaSaidaLocal && !timeRegex.test(formData.horaSaidaLocal)) {
      Alert.alert(
        "Formato Inválido",
        "O formato da hora de saída do local deve ser HH:MM:SS",
        [{ text: "OK" }]
      );
      return false;
    }

    // Validação dos campos obrigatórios
    const camposVazios = validateRequiredFields(formData, dataHora);

    if (camposVazios.length > 0) {
      const camposLista = camposVazios
        .map((campo) => `• ${campo.campo}`)
        .join("\n");
      Alert.alert(
        "Campos Obrigatórios",
        `Os seguintes campos são obrigatórios:\n\n${camposLista}`,
        [{ text: "OK" }]
      );
      return false;
    }

    return true;
  };

  // Função para salvar a ocorrência - ATUALIZADA
  const handleSave = async () => {
    if (!validateForm()) return;
    if (enviando) return;

    // Pop-up de confirmação
    Alert.alert(
      "Confirmar Salvamento",
      "Tem certeza que deseja salvar esta ocorrência?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              setEnviando(true);

              // Calcular tempo de resposta se houver horários
              let tempoResposta = 0;
              if (formData.horaSaidaQuartel && formData.horaLocal) {
                const [hSaidaH, hSaidaM, hSaidaS] = formData.horaSaidaQuartel
                  .split(":")
                  .map(Number);
                const [hLocalH, hLocalM, hLocalS] = formData.horaLocal
                  .split(":")
                  .map(Number);

                const saidaSegundos = hSaidaH * 3600 + hSaidaM * 60 + hSaidaS;
                const localSegundos = hLocalH * 3600 + hLocalM * 60 + hLocalS;

                tempoResposta = Math.max(0, localSegundos - saidaSegundos) / 60; // Em minutos
              }

              // Mapear situação para status do Dashboard
              const mapStatus = (situacao) => {
                switch (situacao?.toLowerCase()) {
                  case "finalizada":
                  case "atendida":
                    return "finalizada";
                  case "em andamento":
                  case "aberta":
                    return "em_andamento";
                  case "não atendida":
                  case "sem atuação":
                    return "nao_atendida";
                  default:
                    return "registrada";
                }
              };

              // Monta objeto completo da ocorrência para o Dashboard
              const ocorrenciaData = {
                // Dados básicos para Dashboard
                id: `ocorrencia_${Date.now()}_${Math.random()
                  .toString(36)
                  .substr(2, 9)}`,
                tipo: formData.natureza,
                descricao: `${formData.natureza} - ${
                  formData.grupoOcorrencia || ""
                }`.trim(),
                localizacao:
                  formData.logradouro ||
                  formData.bairro ||
                  formData.municipio ||
                  "Local não informado",
                regiao: formData.regiao,
                status: mapStatus(formData.situacao),
                prioridade:
                  formData.classificacao === "Emergência"
                    ? "alta"
                    : formData.classificacao === "Urgência"
                    ? "media"
                    : "baixa",
                dataHora: dataHora.toISOString(),
                dataCriacao: new Date().toISOString(),
                tempoResposta: Math.round(tempoResposta),

                // Mantém todos os dados originais para detalhes
                ...formData,

                // Campos adicionais para compatibilidade
                numeroAviso: formData.numeroAviso,
                grupamento: formData.grupamento,
                situacao: formData.situacao,
                natureza: formData.natureza,
                grupoOcorrencia: formData.grupoOcorrencia,
                subgrupoOcorrencia: formData.subgrupoOcorrencia,
              };

              console.log("Salvando ocorrência:", ocorrenciaData);

              // SALVA NO CONTEXTO - CORRIGIDO
              await adicionarOcorrencia(ocorrenciaData);

              // Feedback de sucesso
              Alert.alert("Sucesso!", "Ocorrência registrada com sucesso", [
                {
                  text: "OK",
                  onPress: () =>
                    navigation.navigate("OcorrenciaRegistrada", {
                      ocorrencia: ocorrenciaData,
                    }),
                },
              ]);
            } catch (error) {
              console.error("Erro ao salvar ocorrência:", error);
              Alert.alert(
                "Erro",
                "Não foi possível salvar a ocorrência: " + error.message
              );
            } finally {
              setEnviando(false);
            }
          },
        },
      ]
    );
  };

  // Função para limpar o formulário
  const handleClear = () => {
    Alert.alert(
      "Limpar Formulário",
      "Tem certeza que deseja limpar todos os campos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: () => {
            setFormData({
              numeroAviso: gerarNumeroAviso(), // GERA NOVO NÚMERO AO LIMPAR
              diretoria: "DIM",
              grupamento: "",
              pontoBase: "",
              natureza: "",
              grupoOcorrencia: "",
              subgrupoOcorrencia: "",
              situacao: "",
              horaSaidaQuartel: "",
              horaLocal: "",
              horaSaidaLocal: "",
              motivoNaoAtendida: "",
              motivoOutro: "",
              vitimaSamu: false,
              envolvida: false,
              sexo: "",
              idade: "",
              classificacao: "",
              destino: "",
              viatura: "",
              numeroViatura: "",
              acionamento: "",
              localAcionamento: "",
              municipio: "",
              regiao: "",
              bairro: "",
              tipoLogradouro: "",
              ais: "",
              logradouro: "",
              latitude: "",
              longitude: "",
            });
            setDataHora(new Date());
          },
        },
      ]
    );
  };

  // Verifica se deve mostrar o campo de motivo
  const shouldShowMotivo =
    formData.situacao === "Não Atendida" || formData.situacao === "Sem Atuação";

  // Função para fechar o teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={100}
        extraHeight={120}
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
      >
        {/*Seção: Dados Internos */}
        <Section title="Dados Internos">
          <InputGroup label="Data e Hora" required>
            <DatePickerInput
              value={dataHora}
              onDateChange={onDateChange}
              showPicker={showDatePicker}
              setShowPicker={setShowDatePicker}
              placeholder="Selecione a data e hora*"
            />
          </InputGroup>

          <InputGroup label="Número do Aviso (I-NETOISPATCHER)">
            <TextInput
              value={formData.numeroAviso}
              onChangeText={(value) => updateFormData("numeroAviso", value)}
              placeholder="Número gerado automaticamente"
              editable={true}
              style={styles.autoGeneratedInput}
            />
            <Text style={styles.helperText}>
              Formato: YYYYMMDDHHMMSS + sufixo único
            </Text>
          </InputGroup>

          <InputGroup label="Diretoria" required>
            <TextInput
              value={formData.diretoria}
              onChangeText={(value) => updateFormData("diretoria", value)}
              placeholder="Digite a diretoria*"
            />
          </InputGroup>

          <InputGroup label="Grupamento" required>
            <PickerInput
              selectedValue={formData.grupamento}
              onValueChange={(value) => updateFormData("grupamento", value)}
              items={GRUPAMENTOS}
              placeholder="Selecione o grupamento*"
            />
          </InputGroup>

          <InputGroup label="Ponto Base" required>
            <TextInput
              value={formData.pontoBase}
              onChangeText={(value) => updateFormData("pontoBase", value)}
              placeholder="Digite o ponto base*"
            />
          </InputGroup>
        </Section>

        {/* Seção: Ocorrência */}
        <Section title="Ocorrência">
          <InputGroup label="Natureza da Ocorrência" required>
            <PickerInput
              selectedValue={formData.natureza}
              onValueChange={(value) => updateFormData("natureza", value)}
              items={NATUREZAS}
              placeholder="Selecione a Natureza da Ocorrência*"
            />
          </InputGroup>

          <InputGroup label="Grupo da Ocorrência" required>
            <PickerInput
              selectedValue={formData.grupoOcorrencia}
              onValueChange={(value) =>
                updateFormData("grupoOcorrencia", value)
              }
              items={GRUPOS_OCORRENCIA}
              placeholder="Selecione o Grupo de Ocorrência*"
            />
          </InputGroup>

          <InputGroup label="Subgrupo da Ocorrência" required>
            <PickerInput
              selectedValue={formData.subgrupoOcorrencia}
              onValueChange={(value) =>
                updateFormData("subgrupoOcorrencia", value)
              }
              items={SUBGRUPOS_OCORRENCIA}
              placeholder="Selecione o Subgrupo da Ocorrência*"
            />
          </InputGroup>

          <InputGroup label="Situação da Ocorrência" required>
            <PickerInput
              selectedValue={formData.situacao}
              onValueChange={(value) => updateFormData("situacao", value)}
              items={SITUACOES}
              placeholder="Selecione a Situação da Ocorrência*"
            />
          </InputGroup>

          {/* Horários */}
          <View style={styles.row}>
            <InputGroup label="Saída do Quartel" required style={styles.flex1}>
              <TimeInput
                value={formData.horaSaidaQuartel}
                onChangeText={(value) =>
                  updateFormData("horaSaidaQuartel", value)
                }
                placeholder="HH:MM:SS*"
                showValidation={true}
              />
            </InputGroup>

            <InputGroup
              label="Chegada no Local"
              required
              style={[styles.flex1, styles.marginLeft]}
            >
              <TimeInput
                value={formData.horaLocal}
                onChangeText={(value) => updateFormData("horaLocal", value)}
                placeholder="HH:MM:SS*"
                showValidation={true}
              />
            </InputGroup>
          </View>

          {/* Motivo para ocorrência não atendida ou sem atuação */}
          {shouldShowMotivo && (
            <>
              <InputGroup label="Motivo do Não Atendimento">
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.motivoNaoAtendida}
                    onValueChange={(value) =>
                      updateFormData("motivoNaoAtendida", value)
                    }
                    style={styles.picker}
                  >
                    {MOTIVOS_NAO_ATENDIMENTO.map((item) => (
                      <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
              </InputGroup>

              {/* Campo para "Outro" motivo */}
              {formData.motivoNaoAtendida === "Outro" && (
                <InputGroup label="Descreva o motivo (máx. 100 caracteres)">
                  <TextInput
                    value={formData.motivoOutro}
                    onChangeText={(value) => {
                      // Limita a 100 caracteres
                      if (value.length <= 100) {
                        updateFormData("motivoOutro", value);
                      }
                    }}
                    placeholder="Digite o motivo..."
                    multiline
                    numberOfLines={3}
                    style={styles.textArea}
                    maxLength={100}
                  />
                  <Text style={styles.charCounter}>
                    {formData.motivoOutro.length}/100 caracteres
                  </Text>
                </InputGroup>
              )}
            </>
          )}

          <InputGroup label="Saída do Local" required>
            <TimeInput
              value={formData.horaSaidaLocal}
              onChangeText={(value) => updateFormData("horaSaidaLocal", value)}
              placeholder="HH:MM:SS*"
              showValidation={true}
            />
          </InputGroup>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima socorrida pelo SAMU</Text>
            <View style={styles.switchWrapper}>
              <Text style={styles.switchLabel}>NÃO</Text>
              <Switch
                value={formData.vitimaSamu}
                onValueChange={(value) => updateFormData("vitimaSamu", value)}
                trackColor={{ false: "#767577", true: "#40a02b" }}
                thumbColor={formData.vitimaSamu ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
              />
              <Text style={styles.switchLabel}>SIM</Text>
            </View>
          </View>
        </Section>

        {/* Seção: Informações da Vítima */}
        <Section title="Informações da Vítima">
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima Envolvida</Text>
            <View style={styles.switchWrapper}>
              <Text style={styles.switchLabel}>NÃO</Text>
              <Switch
                value={formData.envolvida}
                onValueChange={(value) => updateFormData("envolvida", value)}
                trackColor={{ false: "#767577", true: "#40a02b" }}
                thumbColor={formData.envolvida ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
              />
              <Text style={styles.switchLabel}>SIM</Text>
            </View>
          </View>

          <InputGroup label="Sexo da Vítima">
            <PickerInput
              selectedValue={formData.sexo}
              onValueChange={(value) => updateFormData("sexo", value)}
              items={SEXOS}
              placeholder="Selecione o sexo da vítima"
            />
          </InputGroup>

          <InputGroup label="Idade da Vítima">
            <TextInput
              value={formData.idade}
              onChangeText={(value) => updateFormData("idade", value)}
              placeholder="Digite a idade"
              keyboardType="numeric"
            />
          </InputGroup>

          <InputGroup label="Classificação da Vítima">
            <PickerInput
              selectedValue={formData.classificacao}
              onValueChange={(value) => updateFormData("classificacao", value)}
              items={CLASSIFICACOES}
              placeholder="Selecione a Classificação da Vítima"
            />
          </InputGroup>

          <InputGroup label="Destino da Vítima">
            <PickerInput
              selectedValue={formData.destino}
              onValueChange={(value) => updateFormData("destino", value)}
              items={DESTINOS}
              placeholder="Selecione o Destino da Vítima"
            />
          </InputGroup>
        </Section>

        {/* Seção: Viatura e Acionamento */}
        <Section title="Viatura e Acionamento">
          <InputGroup label="Viatura Empregada">
            <TextInput
              value={formData.viatura}
              onChangeText={(value) => updateFormData("viatura", value)}
              placeholder="Digite a viatura empregada"
            />
          </InputGroup>

          <InputGroup label="Número da Viatura">
            <TextInput
              value={formData.numeroViatura}
              onChangeText={(value) => updateFormData("numeroViatura", value)}
              placeholder="Digite o número da viatura"
            />
          </InputGroup>

          <InputGroup label="Forma de Acionamento">
            <PickerInput
              selectedValue={formData.acionamento}
              onValueChange={(value) => updateFormData("acionamento", value)}
              items={ACIONAMENTOS}
              placeholder="Selecione a Forma de Acionamento"
            />
          </InputGroup>

          <InputGroup label="Local do Acionamento">
            <TextInput
              value={formData.localAcionamento}
              onChangeText={(value) =>
                updateFormData("localAcionamento", value)
              }
              placeholder="Digite o local do acionamento"
            />
          </InputGroup>
        </Section>

        {/* Seção: Endereço */}
        <Section title="Endereço da Ocorrência">
          <InputGroup label="Município" required>
            <TextInput
              value={formData.municipio}
              onChangeText={(value) => updateFormData("municipio", value)}
              placeholder="Digite o município*"
            />
          </InputGroup>

          <InputGroup label="Região" required>
            <PickerInput
              selectedValue={formData.regiao}
              onValueChange={(value) => updateFormData("regiao", value)}
              items={REGIOES}
              placeholder="Selecione a região*"
            />
          </InputGroup>

          <InputGroup label="Bairro">
            <TextInput
              value={formData.bairro}
              onChangeText={(value) => updateFormData("bairro", value)}
              placeholder="Digite o bairro"
            />
          </InputGroup>

          <InputGroup label="Tipo de Logradouro" required>
            <PickerInput
              selectedValue={formData.tipoLogradouro}
              onValueChange={(value) => updateFormData("tipoLogradouro", value)}
              items={TIPOS_LOGRADOURO}
              placeholder="Selecione o Tipo de Logradouro*"
            />
          </InputGroup>

          <InputGroup label="AIS">
            <TextInput
              value={formData.ais}
              onChangeText={(value) => updateFormData("ais", value)}
              placeholder="AIS 01 - 10"
              keyboardType="numeric"
            />
          </InputGroup>

          <InputGroup label="Logradouro" required>
            <TextInput
              value={formData.logradouro}
              onChangeText={(value) => updateFormData("logradouro", value)}
              placeholder="Digite o logradouro*"
            />
          </InputGroup>

          <View style={styles.row}>
            <InputGroup label="Latitude" style={styles.flex1}>
              <TextInput
                value={formData.latitude}
                onChangeText={(value) => updateFormData("latitude", value)}
                placeholder="Digite a latitude"
                keyboardType="numbers-and-punctuation"
              />
            </InputGroup>

            <InputGroup
              label="Longitude"
              style={[styles.flex1, styles.marginLeft]}
            >
              <TextInput
                value={formData.longitude}
                onChangeText={(value) => updateFormData("longitude", value)}
                placeholder="Digite a longitude"
                keyboardType="numbers-and-punctuation"
              />
            </InputGroup>
          </View>
        </Section>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              enviando && styles.disabledButton,
            ]}
            onPress={handleSave}
            disabled={enviando}
          >
            <Text style={styles.buttonText}>
              {enviando ? "Salvando..." : "Salvar Ocorrência"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requiredNote}>
          <Text style={styles.requiredText}>* Campos obrigatórios</Text>
          <Text style={styles.requiredText}>FIRE ALPHA</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  row: {
    flexDirection: "row",
  },
  flex1: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: 8,
  },
  switchContainer: {
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 8,
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  switchLabel: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  clearButton: {
    backgroundColor: "#6c757d",
  },
  saveButton: {
    backgroundColor: "#bc010c",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  requiredNote: {
    alignItems: "center",
    marginBottom: 20,
  },
  requiredText: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginTop: 4,
  },
  picker: {
    height: 56,
    color: "#333",
    fontSize: 16,
    paddingHorizontal: 8,
  },
  charCounter: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    marginTop: 4,
  },
  autoGeneratedInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  helperText: {
    fontSize: 11,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
  },
});

export default NovaOcorrenciaScreen;
