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
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// Import dos componentes
import Section from "../components/Section";
import InputGroup from "../components/InputGroup";
import TimeInput from "../components/TimeInput";
import DatePickerInput from "../components/DatePickerInput";
import PickerInput from "../components/PickerInput";
import TextInput from "../components/TextInput";
import SearchablePicker from "../components/SearchablePicker";

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

//Import dos Municípios
import { MUNICIPIOS_PERNAMBUCO } from "../constants/pickerData";

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
  const [fotoOcorrencia, setFotoOcorrencia] = useState(null);

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

  // Função para solicitar permissão da câmera
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permissão da Câmera",
            message:
              "Este app precisa acessar sua câmera para tirar fotos das ocorrências",
            buttonNeutral: "Perguntar depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Função para solicitar permissão da galeria
  const requestGalleryPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Permissão da Galeria",
            message:
              "Este app precisa acessar sua galeria para selecionar fotos",
            buttonNeutral: "Perguntar depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Função para abrir a câmera
  const abrirCamera = async () => {
    console.log("Abrindo câmera...");

    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert(
        "Permissão Negada",
        "Não é possível acessar a câmera sem permissão."
      );
      return;
    }

    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
      cameraType: "back",
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      console.log("Resposta da câmera:", response);

      if (response.didCancel) {
        console.log("Usuário cancelou a câmera");
      } else if (response.error) {
        console.log("Erro da câmera: ", response.error);
        Alert.alert(
          "Erro",
          `Não foi possível abrir a câmera: ${response.error}`
        );
      } else if (response.assets && response.assets.length > 0) {
        // Foto tirada com sucesso
        const photo = response.assets[0];
        console.log("Foto capturada:", photo);
        setFotoOcorrencia(photo);
      } else {
        console.log("Resposta inesperada:", response);
        Alert.alert("Erro", "Não foi possível capturar a foto");
      }
    });
  };

  // Função para abrir a galeria
  const abrirGaleria = async () => {
    console.log("Abrindo galeria...");

    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) {
      Alert.alert(
        "Permissão Negada",
        "Não é possível acessar a galeria sem permissão."
      );
      return;
    }

    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      console.log("Resposta da galeria:", response);

      if (response.didCancel) {
        console.log("Usuário cancelou a seleção");
      } else if (response.error) {
        console.log("Erro da galeria: ", response.error);
        Alert.alert(
          "Erro",
          `Não foi possível acessar a galeria: ${response.error}`
        );
      } else if (response.assets && response.assets.length > 0) {
        const photo = response.assets[0];
        console.log("Foto selecionada:", photo);
        setFotoOcorrencia(photo);
      } else {
        console.log("Resposta inesperada:", response);
        Alert.alert("Erro", "Não foi possível selecionar a foto");
      }
    });
  };

  // Função para mostrar opções de foto
  const mostrarOpcoesFoto = () => {
    console.log("Mostrando opções de foto...");

    // Verifica se as funções estão disponíveis
    if (
      typeof launchCamera === "undefined" ||
      typeof launchImageLibrary === "undefined"
    ) {
      Alert.alert(
        "Funcionalidade Não Disponível",
        "A funcionalidade de câmera não está disponível no momento. Verifique se o react-native-image-picker foi instalado corretamente.",
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert("Adicionar Foto", "Como deseja adicionar a foto?", [
      {
        text: "Tirar Foto",
        onPress: () => {
          console.log("Usuário escolheu tirar foto");
          abrirCamera();
        },
      },
      {
        text: "Escolher da Galeria",
        onPress: () => {
          console.log("Usuário escolheu galeria");
          abrirGaleria();
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => console.log("Usuário cancelou"),
      },
    ]);
  };

  // Função para remover a foto
  const removerFoto = () => {
    Alert.alert("Remover Foto", "Tem certeza que deseja remover a foto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => setFotoOcorrencia(null),
      },
    ]);
  };

  // Função para lidar com mudança de data
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataHora(selectedDate);
    }
  };

  // Função para validar e formatar a idade
  const handleIdadeChange = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/[^0-9]/g, "");

    // Se estiver vazio, atualiza normalmente
    if (numericValue === "") {
      updateFormData("idade", "");
      return;
    }

    // Converte para número e limita a 125
    let idade = parseInt(numericValue, 10);
    if (idade > 125) {
      idade = 125;
    }

    // Atualiza o valor formatado
    updateFormData("idade", idade.toString());
  };

  // Função para validar e formatar o AIS - CORRIGIDA
  const handleAISChange = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/[^0-9]/g, "");

    // Permite que o usuário apague completamente
    if (numericValue === "") {
      updateFormData("ais", "");
      return;
    }

    // Converte para número
    let ais = parseInt(numericValue, 10);

    // Valida o intervalo 1-10
    if (ais < 1) {
      ais = 1;
    } else if (ais > 10) {
      ais = 10;
    }

    // Atualiza o valor (sem formatação automática para permitir edição)
    updateFormData("ais", ais.toString());
  };

  // Função para formatar o AIS quando o campo perde o foco
  const handleAISBlur = () => {
    if (formData.ais && formData.ais !== "") {
      const aisNumber = parseInt(formData.ais, 10);
      if (!isNaN(aisNumber) && aisNumber >= 1 && aisNumber <= 10) {
        // Formata com 2 dígitos apenas no blur
        const formattedAIS =
          aisNumber < 10 ? `0${aisNumber}` : aisNumber.toString();
        updateFormData("ais", formattedAIS);
      }
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
      `Tem certeza que deseja salvar esta ocorrência?${
        fotoOcorrencia ? "\n\n✅ Uma foto será incluída no registro." : ""
      }`,
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

              // Formatar AIS antes de salvar (se necessário)
              let aisToSave = formData.ais;
              if (aisToSave && aisToSave !== "") {
                const aisNumber = parseInt(aisToSave, 10);
                if (!isNaN(aisNumber) && aisNumber >= 1 && aisNumber <= 10) {
                  aisToSave =
                    aisNumber < 10 ? `0${aisNumber}` : aisNumber.toString();
                }
              }

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

                // Adiciona a foto ao registro
                foto: fotoOcorrencia
                  ? {
                      uri: fotoOcorrencia.uri,
                      type: fotoOcorrencia.type,
                      fileName: fotoOcorrencia.fileName,
                      fileSize: fotoOcorrencia.fileSize,
                    }
                  : null,

                // Mantém todos os dados originais para detalhes
                ...formData,
                ais: aisToSave, // Usa o AIS formatado

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
              Alert.alert(
                "Sucesso!",
                `Ocorrência registrada com sucesso${
                  fotoOcorrencia ? " incluindo a foto" : ""
                }`,
                [
                  {
                    text: "OK",
                    onPress: () =>
                      navigation.navigate("OcorrenciaRegistrada", {
                        ocorrencia: ocorrenciaData,
                      }),
                  },
                ]
              );
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
            setFotoOcorrencia(null);
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
              placeholder="Selecione a data e hora"
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
              placeholder="Digite a diretoria"
            />
          </InputGroup>

          <InputGroup label="Grupamento" required>
            <PickerInput
              selectedValue={formData.grupamento}
              onValueChange={(value) => updateFormData("grupamento", value)}
              items={GRUPAMENTOS}
              placeholder="Selecione o grupamento"
            />
          </InputGroup>

          <InputGroup label="Ponto Base" required>
            <TextInput
              value={formData.pontoBase}
              onChangeText={(value) => updateFormData("pontoBase", value)}
              placeholder="Digite o ponto base"
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
              placeholder="Selecione a Natureza da Ocorrência"
            />
          </InputGroup>

          {/* Grupo da Ocorrência com SearchablePicker */}
          <InputGroup label="Grupo da Ocorrência" required>
            <SearchablePicker
              selectedValue={formData.grupoOcorrencia}
              onValueChange={(value) =>
                updateFormData("grupoOcorrencia", value)
              }
              items={GRUPOS_OCORRENCIA}
              placeholder="Selecione o Grupo de Ocorrência"
            />
          </InputGroup>

          {/* Subgrupo da Ocorrência com SearchablePicker */}
          <InputGroup label="Subgrupo da Ocorrência" required>
            <SearchablePicker
              selectedValue={formData.subgrupoOcorrencia}
              onValueChange={(value) =>
                updateFormData("subgrupoOcorrencia", value)
              }
              items={SUBGRUPOS_OCORRENCIA}
              placeholder="Selecione o Subgrupo da Ocorrência"
            />
          </InputGroup>

          <InputGroup label="Situação da Ocorrência" required>
            <PickerInput
              selectedValue={formData.situacao}
              onValueChange={(value) => updateFormData("situacao", value)}
              items={SITUACOES}
              placeholder="Selecione a Situação da Ocorrência"
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
                placeholder="HH:MM:SS"
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
                placeholder="HH:MM:SS"
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
              placeholder="HH:MM:SS"
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
              onChangeText={handleIdadeChange}
              placeholder="Digite a idade (0-125)"
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.helperText}>Idade limitada a 125 anos</Text>
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
            <SearchablePicker
              selectedValue={formData.municipio}
              onValueChange={(value) => updateFormData("municipio", value)}
              items={MUNICIPIOS_PERNAMBUCO}
              placeholder="Selecione o município"
            />
          </InputGroup>

          <InputGroup label="Região" required>
            <PickerInput
              selectedValue={formData.regiao}
              onValueChange={(value) => updateFormData("regiao", value)}
              items={REGIOES}
              placeholder="Selecione a região"
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
              placeholder="Selecione o Tipo de Logradouro"
            />
          </InputGroup>

          <InputGroup label="AIS">
            <TextInput
              value={formData.ais}
              onChangeText={handleAISChange}
              onBlur={handleAISBlur}
              placeholder="AIS 1-10"
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={styles.helperText}>AIS deve ser entre 1 e 10</Text>
          </InputGroup>

          <InputGroup label="Logradouro" required>
            <TextInput
              value={formData.logradouro}
              onChangeText={(value) => updateFormData("logradouro", value)}
              placeholder="Digite o logradouro"
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

        {/* Nova Seção: Registro Fotográfico */}
        <Section title="Registro Fotográfico">
          <View style={styles.photoSection}>
            {fotoOcorrencia ? (
              <View style={styles.photoPreviewContainer}>
                <Image
                  source={{ uri: fotoOcorrencia.uri }}
                  style={styles.photoPreview}
                  resizeMode="cover"
                  onError={(error) =>
                    console.log("Erro ao carregar imagem:", error)
                  }
                />
                <Text style={styles.photoInfo}>
                  Foto: {fotoOcorrencia.fileName || "sem nome"}
                </Text>
                <View style={styles.photoActions}>
                  <TouchableOpacity
                    style={[styles.photoButton, styles.retakeButton]}
                    onPress={mostrarOpcoesFoto}
                  >
                    <Text style={styles.photoButtonText}>🔄 Alterar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.photoButton, styles.removeButton]}
                    onPress={removerFoto}
                  >
                    <Text style={styles.photoButtonText}>🗑️ Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={mostrarOpcoesFoto}
                activeOpacity={0.7}
              >
                <View style={styles.cameraButtonContent}>
                  <Text style={styles.cameraButtonIcon}>📷</Text>
                  <Text style={styles.cameraButtonText}>
                    Adicionar Foto da Ocorrência
                  </Text>
                  <Text style={styles.cameraButtonSubtext}>
                    Toque para tirar uma foto ou escolher da galeria
                  </Text>
                </View>
              </TouchableOpacity>
            )}
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
  // Novos estilos para a seção de foto
  photoSection: {
    marginVertical: 10,
  },
  cameraButton: {
    borderWidth: 2,
    borderColor: "#bc010c",
    borderStyle: "dashed",
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  cameraButtonContent: {
    alignItems: "center",
  },
  cameraButtonIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cameraButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#bc010c",
    textAlign: "center",
    marginBottom: 5,
  },
  cameraButtonSubtext: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  photoPreviewContainer: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 15,
  },
  photoPreview: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
  },
  photoInfo: {
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  photoActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  photoButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  retakeButton: {
    backgroundColor: "#bc010c",
  },
  removeButton: {
    backgroundColor: "#6c757d",
  },
  photoButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default NovaOcorrenciaScreen;
