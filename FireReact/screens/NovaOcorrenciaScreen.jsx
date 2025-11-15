// screens/NovaOcorrenciaScreen.jsx
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Keyboard,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Section from "../components/Section";
import InputGroup from "../components/InputGroup";
import DateTimePickerInput from "../components/DateTimePickerInput";
import DatePickerInput from "../components/DatePickerInput";
import PickerInput from "../components/PickerInput";
import TextInput from "../components/TextInput";
import SearchablePicker from "../components/SearchablePicker";
import CameraIcon from "../components/CameraIcon";

import { useOcorrenciasContext } from "../contexts/OcorrenciasContext";
import { useTheme } from "../contexts/ThemeContext";

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
  REGIOES,
  MUNICIPIOS_PERNAMBUCO,
} from "../constants/pickerData";

const MOTIVOS_NAO_ATENDIMENTO = [
  { label: "Selecione o motivo de não atendimento", value: "" },
  { label: "Vítima Socorrida pelo Samu", value: "Vítima Socorrida pelo Samu" },
  { label: "Vítima Socorrida pelos Populares", value: "Vítima Socorrida pelos Populares" },
  { label: "Recusou Atendimento", value: "Recusou Atendimento" },
  { label: "Outro", value: "Outro" },
];

const gerarNumeroAviso = () => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");
  const sufixo = Math.floor(1000 + Math.random() * 9000);
  return `${ano}${mes}${dia}${horas}${minutos}${segundos}${sufixo}`;
};

const validateRequiredFields = (
  formData,
  dataHora,
  horaSaidaQuartel,
  horaLocal,
  horaSaidaLocal
) => {
  const camposObrigatorios = [
    { campo: "Data e Hora", preenchido: dataHora !== null, valor: dataHora },
    { campo: "Diretoria", preenchido: !!formData.diretoria?.trim(), valor: formData.diretoria },
    { campo: "Grupamento", preenchido: !!formData.grupamento?.trim(), valor: formData.grupamento },
    { campo: "Ponto Base", preenchido: !!formData.pontoBase?.trim(), valor: formData.pontoBase },
    { campo: "Natureza da Ocorrência", preenchido: !!formData.natureza?.trim(), valor: formData.natureza },
    { campo: "Grupo da Ocorrência", preenchido: !!formData.grupoOcorrencia?.trim(), valor: formData.grupoOcorrencia },
    { campo: "Subgrupo da Ocorrência", preenchido: !!formData.subgrupoOcorrencia?.trim(), valor: formData.subgrupoOcorrencia },
    { campo: "Situação da Ocorrência", preenchido: !!formData.situacao?.trim(), valor: formData.situacao },
    { campo: "Saída do Quartel", preenchido: horaSaidaQuartel !== null, valor: horaSaidaQuartel },
    { campo: "Chegada no Local", preenchido: horaLocal !== null, valor: horaLocal },
    { campo: "Saída do Local", preenchido: horaSaidaLocal !== null, valor: horaSaidaLocal },
    { campo: "Município", preenchido: !!formData.municipio?.trim(), valor: formData.municipio },
    { campo: "Região", preenchido: !!formData.regiao?.trim(), valor: formData.regiao },
    { campo: "Tipo de Logradouro", preenchido: !!formData.tipoLogradouro?.trim(), valor: formData.tipoLogradouro },
    { campo: "Logradouro", preenchido: !!formData.logradouro?.trim(), valor: formData.logradouro },
  ];
  return camposObrigatorios.filter((campo) => !campo.preenchido);
};

const NovaOcorrenciaScreen = ({ navigation }) => {
  const { adicionarOcorrencia } = useOcorrenciasContext();
  const { colors } = useTheme();

  const [formData, setFormData] = useState({
    numeroAviso: gerarNumeroAviso(),
    diretoria: "DIM",
    grupamento: "",
    pontoBase: "",
    natureza: "",
    grupoOcorrencia: "",
    subgrupoOcorrencia: "",
    situacao: "",
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

  const [dataHora, setDataHora] = useState(new Date());
  const [horaSaidaQuartel, setHoraSaidaQuartel] = useState(null);
  const [horaLocal, setHoraLocal] = useState(null);
  const [horaSaidaLocal, setHoraSaidaLocal] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [fotoOcorrencia, setFotoOcorrencia] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      numeroAviso: gerarNumeroAviso(),
    }));
  }, [dataHora]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Permissões e foto
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

  const abrirCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("Permissão Negada", "Não é possível acessar a câmera sem permissão.");
      return;
    }
    launchCamera(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
        cameraType: "back",
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.error) {
          Alert.alert("Erro", `Não foi possível abrir a câmera: ${response.error}`);
        } else if (response.assets && response.assets.length > 0) {
          setFotoOcorrencia(response.assets[0]);
        } else {
          Alert.alert("Erro", "Não foi possível capturar a foto");
        }
      }
    );
  };

  const abrirGaleria = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert("Permissão Negada", "Não é possível acessar a galeria sem permissão.");
      return;
    }
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.error) {
          Alert.alert("Erro", `Não foi possível acessar a galeria: ${response.error}`);
        } else if (response.assets && response.assets.length > 0) {
          setFotoOcorrencia(response.assets[0]);
        } else {
          Alert.alert("Erro", "Não foi possível selecionar a foto");
        }
      }
    );
  };

  const mostrarOpcoesFoto = () => {
    Alert.alert("Adicionar Foto", "Como deseja adicionar a foto?", [
      { text: "Tirar Foto", onPress: abrirCamera },
      { text: "Escolher da Galeria", onPress: abrirGaleria },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const removerFoto = () => {
    Alert.alert("Remover Foto", "Tem certeza que deseja remover a foto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: () => setFotoOcorrencia(null) },
    ]);
  };

  // Helpers de botões dinâmicos
  const getOptionButtonStyle = (selected) => ({
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 2,
    backgroundColor: selected ? colors.primary : colors.surface,
    borderColor: selected ? colors.primary : colors.border,
  });
  const getOptionButtonTextStyle = (selected) => ({
    fontSize: 16,
    fontWeight: "bold",
    color: selected ? colors.textOnPrimary : colors.textSecondary,
  });
  
  // Botões de ação
  const getActionButtonStyle = (type, disabled) => {
    let bg;
    if (disabled) bg = colors.divider;
    else if (type === "save") bg = colors.primary;
    else if (type === "clear") bg = colors.textSecondary;
    else bg = colors.primary;
    return {
      flex: 1,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginHorizontal: 6,
      backgroundColor: bg,
      opacity: disabled ? 0.7 : 1,
    };
  };
  
  // Texto dos botões de ação
  const getActionButtonTextStyle = () => ({
    color: colors.textOnPrimary,
    fontWeight: "bold",
    fontSize: 16,
  });

  // Helpers para outros estilos dinâmicos
  const containerStyle = [styles.container, { backgroundColor: colors.background }];
  
  // Picker/input styles
  const pickerContainerStyle = [styles.pickerContainer, { borderColor: colors.border, backgroundColor: colors.card }];
  
  // Auto generated input
  const autoGeneratedInputStyle = [styles.autoGeneratedInput, { borderColor: colors.border, backgroundColor: colors.surface, color: colors.text }];
  
  // Helper text/char counter
  const helperTextStyle = [styles.helperText, { color: colors.textSecondary }];
  
  // Required text
  const requiredTextStyle = [styles.requiredText, { color: colors.textSecondary }];
  
  // Camera/photo section
  const cameraButtonStyle = [styles.cameraButton, { borderColor: colors.primary, backgroundColor: colors.surface }];
  
  // Photo preview
  const photoPreviewContainerStyle = [styles.photoPreviewContainer, { backgroundColor: colors.surface }];
  
  // Retake/remove photo buttons
  const retakeButtonStyle = [styles.photoButton, { backgroundColor: colors.primary }];
  
  const removeButtonStyle = [styles.photoButton, { backgroundColor: colors.textSecondary }];

  
// Funções auxiliares para campos de idade/AIS
const handleIdadeChange = (value) => {
   // Remove caracteres não numéricos
   const numericValue = value.replace(/[^0-9]/g, "");
   if (numericValue === "") {
     updateFormData("idade", "");
     return;
   }
   let idade = parseInt(numericValue, 10);
   if (idade > 125) idade = 125;
   updateFormData("idade", idade.toString());
};
const handleAISChange = (value) => {
   const numericValue = value.replace(/[^0-9]/g, "");
   if (numericValue === "") {
     updateFormData("ais", "");
     return;
   }
   let ais = parseInt(numericValue,10);
   if (ais <1) ais=1;
   else if (ais>10) ais=10;
   updateFormData("ais", ais.toString());
};
const handleAISBlur = () => {
   if (formData.ais && formData.ais !== "") {
     const aisNumber = parseInt(formData.ais,10);
     if (!isNaN(aisNumber) && aisNumber >=1 && aisNumber <=10) {
       updateFormData("ais", aisNumber <10 ? `0${aisNumber}` : aisNumber.toString());
     }
   }
};
const formatHoraToString = (date) => {
   if (!date) return "";
   return date.toLocaleTimeString("pt-BR",{ hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false });
};

const shouldShowMotivo =
   formData.situacao === "Não Atendida" || formData.situacao === "Sem Atuação";

// Função para salvar ocorrência
const handleSave = async () => {
   const camposVazios = validateRequiredFields(
     formData,dataHora,horaSaidaQuartel,horaLocal,horaSaidaLocal
   );
   if (camposVazios.length >0) {
     Alert.alert(
       "Campos Obrigatórios",
       `Os seguintes campos são obrigatórios:\n\n${camposVazios.map((campo)=>`• ${campo.campo}`).join("\n")}`,
       [{ text:"OK" }]
     );
     return;
   }
   if (enviando) return;

   Alert.alert(
     "Confirmar Salvamento",
     `Tem certeza que deseja salvar esta ocorrência?${fotoOcorrencia ? "\n\n✅ Uma foto será incluída no registro." : ""}`,
     [
       { text:"Cancelar", style:"cancel" },
       {
         text:"Sim",
         onPress : async () => {
           try{
             setEnviando(true);
             let tempoResposta=0;
             if(horaSaidaQuartel && horaLocal){
               const saidaSegundos=horaSaidaQuartel.getHours()*3600+horaSaidaQuartel.getMinutes()*60+horaSaidaQuartel.getSeconds();
               const localSegundos=horaLocal.getHours()*3600+horaLocal.getMinutes()*60+horaLocal.getSeconds();
               tempoResposta=Math.max(0,localSegundos-saidaSegundos)/60;
             }
             // Mapear situação para status do Dashboard
             const mapStatus=(situacao)=>{
               switch((situacao||"").toLowerCase()){
                 case"finalizada":case"atendida":return"finalizada";
                 case"em andamento":case"aberta":return"em_andamento";
                 case"não atendida":case"sem atuação":return"nao_atendida";
                 default:return"registrada";
               }
             };
             let aisToSave=formData.ais;
             if(aisToSave && aisToSave!==""){
               const aisNumber=parseInt(aisToSave,10);
               if(!isNaN(aisNumber)&&aisNumber>=1&&aisNumber<=10){
                 aisToSave=aisNumber<10?`0${aisNumber}` : aisNumber.toString();
               }
             }
             // Monta objeto completo da ocorrência para o Dashboard
             const ocorrenciaData={
               id:`ocorrencia_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,
               tipo : formData.natureza,
               descricao : `${formData.natureza} - ${formData.grupoOcorrencia||""}`.trim(),
               localizacao : formData.logradouro || formData.bairro || formData.municipio ||"Local não informado",
               regiao : formData.regiao,
               status : mapStatus(formData.situacao),
               prioridade :
                 formData.classificacao==="Emergência"? "alta":
                 formData.classificacao==="Urgência"?   "media":"baixa",
               dataHora : dataHora.toISOString(),
               dataCriacao : new Date().toISOString(),
               tempoResposta : Math.round(tempoResposta),
               horaSaidaQuartel : formatHoraToString(horaSaidaQuartel),
               horaChegadaLocal : formatHoraToString(horaLocal),
               horaSaidaLocal : formatHoraToString(horaSaidaLocal),
               foto : fotoOcorrencia?{
                 uri : fotoOcorrencia.uri,type : fotoOcorrencia.type,fileName : fotoOcorrencia.fileName,fileSize : fotoOcorrencia.fileSize
               }:null,
               ...formData,
               ais : aisToSave,
               numeroAviso : formData.numeroAviso,
               grupamento : formData.grupamento,
               situacao : formData.situacao,
               natureza : formData.natureza,
               grupoOcorrencia : formData.grupoOcorrencia,
               subgrupoOcorrencia : formData.subgrupoOcorrencia
             };
             await adicionarOcorrencia(ocorrenciaData);
             Alert.alert(
               "Sucesso!",
               `Ocorrência registrada com sucesso${fotoOcorrencia?" incluindo a foto":""}`,
               [{ text:"OK", onPress : ()=>navigation.navigate("OcorrenciaRegistrada",{ ocorrencia : ocorrenciaData }) }]
             );
           }catch(error){
             Alert.alert("Erro","Não foi possível salvar a ocorrência:"+error.message);
           }finally{
             setEnviando(false);
           }
         }
       }
     ]
   );
};

const handleClear=()=>{
   Alert.alert(
     "Limpar Formulário",
     "Tem certeza que deseja limpar todos os campos?",
     [
       { text:"Cancelar", style:"cancel" },
       {
         text:"Limpar",
         style:"destructive",
         onPress : ()=>{
           setFormData({
             numeroAviso : gerarNumeroAviso(),
             diretoria:"DIM",
             grupamento:"",
             pontoBase:"",
             natureza:"",
             grupoOcorrencia:"",
             subgrupoOcorrencia:"",
             situacao:"",
             motivoNaoAtendida:"",
             motivoOutro:"",
             vitimaSamu:false,
             envolvida:false,
             sexo:"",
             idade:"",
             classificacao:"",
             destino:"",
             viatura:"",
             numeroViatura:"",
             acionamento:"",
             localAcionamento:"",
             municipio:"",
             regiao:"",
             bairro:"",
             tipoLogradouro:"",
             ais:"",
             logradouro:"",
             latitude:"",
             longitude:""
           });
           setDataHora(new Date());
           setHoraSaidaQuartel(null);
           setHoraLocal(null);
           setHoraSaidaLocal(null);
           setFotoOcorrencia(null);
         }
       }
     ]
   );
};

return (
<View style={containerStyle}>
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
{/* Seção Dados Internos */}
<Section title="Dados Internos">
 <InputGroup label="Data e Hora" required>
   <DatePickerInput value={dataHora} onDateChange={setDataHora} showPicker={showDatePicker} setShowPicker={setShowDatePicker} placeholder="Selecione a data e hora"/>
 </InputGroup>
 <InputGroup label="Número do Aviso (I-NETOISPATCHER)">
   <TextInput value={formData.numeroAviso} onChangeText={(value)=>updateFormData("numeroAviso",value)} placeholder="Número gerado automaticamente" editable={true} style={autoGeneratedInputStyle}/>
   <Text style={helperTextStyle}>Formato: YYYYMMDDHHMMSS + sufixo único</Text>
 </InputGroup>
 <InputGroup label="Diretoria" required>
   <TextInput value={formData.diretoria} onChangeText={(value)=>updateFormData("diretoria",value)} placeholder="Digite a diretoria"/>
 </InputGroup>
 <InputGroup label="Grupamento" required>
   <PickerInput selectedValue={formData.grupamento} onValueChange={(value)=>updateFormData("grupamento",value)} items={GRUPAMENTOS} placeholder="Selecione o grupamento"/>
 </InputGroup>
 <InputGroup label="Ponto Base" required>
   <TextInput value={formData.pontoBase} onChangeText={(value)=>updateFormData("pontoBase",value)} placeholder="Digite o ponto base"/>
 </InputGroup>
</Section>

{/* Seção Ocorrência */}
<Section title="Ocorrência">
 <InputGroup label="Natureza da Ocorrência" required>
   <PickerInput selectedValue={formData.natureza} onValueChange={(value)=>updateFormData("natureza",value)} items={NATUREZAS} placeholder="Selecione a Natureza da Ocorrência"/>
 </InputGroup>
 <InputGroup label="Grupo da Ocorrência" required>
   <SearchablePicker selectedValue={formData.grupoOcorrencia} onValueChange={(value)=>updateFormData("grupoOcorrencia",value)} items={GRUPOS_OCORRENCIA} placeholder="Selecione o Grupo de Ocorrência"/>
 </InputGroup>
 <InputGroup label="Subgrupo da Ocorrência" required>
   <SearchablePicker selectedValue={formData.subgrupoOcorrencia} onValueChange={(value)=>updateFormData("subgrupoOcorrencia",value)} items={SUBGRUPOS_OCORRENCIA} placeholder="Selecione o Subgrupo da Ocorrência"/>
 </InputGroup>
 <InputGroup label="Situação da Ocorrência" required>
   <PickerInput selectedValue={formData.situacao} onValueChange={(value)=>updateFormData("situacao",value)} items={SITUACOES} placeholder="Selecione a Situação da Ocorrência"/>
 </InputGroup>
 <View style={styles.row}>
   <InputGroup label="Saída do Quartel" required style={styles.flex1}>
     <DateTimePickerInput value={horaSaidaQuartel} onDateTimeChange={setHoraSaidaQuartel} placeholder="Selecione a hora" mode="time"/>
   </InputGroup>
   <InputGroup label="Chegada no Local" required style={[styles.flex1, styles.marginLeft]}>
     <DateTimePickerInput value={horaLocal} onDateTimeChange={setHoraLocal} placeholder="Selecione a hora" mode="time"/>
   </InputGroup>
 </View>
 {/* Motivo para ocorrência não atendida ou sem atuação */}
 {shouldShowMotivo && (
 <>
   <InputGroup label="Motivo do Não Atendimento">
     <View style={pickerContainerStyle}>
       <Picker selectedValue={formData.motivoNaoAtendida} onValueChange={(value)=>updateFormData("motivoNaoAtendida",value)} style={{ color : colors.text }}>
         {MOTIVOS_NAO_ATENDIMENTO.map((item)=>(
           <Picker.Item key={item.value} label={item.label} value={item.value}/>
         ))}
       </Picker>
     </View>
   </InputGroup>
   {/* Campo para Outro motivo */}
   {formData.motivoNaoAtendida==="Outro" && (
     <InputGroup label="Descreva o motivo (máx.100 caracteres)">
       <TextInput value={formData.motivoOutro} onChangeText={(value)=>{if(value.length<=100){updateFormData("motivoOutro",value);}}} placeholder="Digite o motivo..." multiline numberOfLines={3} style={[styles.textArea,{ color : colors.text }]} maxLength={100}/>
       <Text style={[styles.charCounter,{ color : colors.textSecondary }]}>{formData.motivoOutro.length}/100 caracteres</Text>
     </InputGroup>
   )}
 </>
 )}
 <InputGroup label="Saída do Local" required>
   <DateTimePickerInput value={horaSaidaLocal} onDateTimeChange={setHoraSaidaLocal} placeholder="Selecione a hora" mode="time"/>
 </InputGroup>
 {/* Vítima Socorrida pelo SAMU - BOTÕES SIM/NÃO */}
 <InputGroup label="Vítima socorrida pelo SAMU">
   <View style={styles.buttonGroup}>
     <TouchableOpacity style={getOptionButtonStyle(formData.vitimaSamu)} onPress={()=>updateFormData("vitimaSamu",true)}>
       <Text style={getOptionButtonTextStyle(formData.vitimaSamu)}>SIM</Text>
     </TouchableOpacity>
     <TouchableOpacity style={getOptionButtonStyle(!formData.vitimaSamu)} onPress={()=>updateFormData("vitimaSamu",false)}>
       <Text style={getOptionButtonTextStyle(!formData.vitimaSamu)}>NÃO</Text>
     </TouchableOpacity>
   </View>
 </InputGroup>
</Section>

{/* Seção Informações da Vítima */}
<Section title="Informações da Vítima">
 {/* Vítima Envolvida - BOTÕES SIM/NÃO */}
 <InputGroup label="Vítima Envolvida">
   <View style={styles.buttonGroup}>
     <TouchableOpacity style={getOptionButtonStyle(formData.envolvida)} onPress={()=>updateFormData("envolvida",true)}>
       <Text style={getOptionButtonTextStyle(formData.envolvida)}>SIM</Text>
     </TouchableOpacity>
     <TouchableOpacity style={getOptionButtonStyle(!formData.envolvida)} onPress={()=>updateFormData("envolvida",false)}>
       <Text style={getOptionButtonTextStyle(!formData.envolvida)}>NÃO</Text>
     </TouchableOpacity>
   </View>
 </InputGroup>
 <InputGroup label="Sexo da Vítima">
   <PickerInput selectedValue={formData.sexo} onValueChange={(value)=>updateFormData("sexo",value)} items={SEXOS} placeholder="Selecione o sexo da vítima"/>
 </InputGroup>
 <InputGroup label="Idade da Vítima">
   <TextInput value={formData.idade} onChangeText={handleIdadeChange} placeholder="Digite a idade (0-125)" keyboardType="numeric" maxLength={3}/>
   <Text style={helperTextStyle}>Idade limitada a 125 anos</Text>
 </InputGroup>
 <InputGroup label="Classificação da Vítima">
   <PickerInput selectedValue={formData.classificacao} onValueChange={(value)=>updateFormData("classificacao",value)} items={CLASSIFICACOES} placeholder="Selecione a Classificação da Vítima"/>
 </InputGroup>
 <InputGroup label="Destino da Vítima">
   <PickerInput selectedValue={formData.destino} onValueChange={(value)=>updateFormData("destino",value)} items={DESTINOS} placeholder="Selecione o Destino da Vítima"/>
 </InputGroup>
</Section>

{/* Seção Viatura e Acionamento */}
<Section title="Viatura e Acionamento">
 <InputGroup label="Viatura Empregada">
   <TextInput value={formData.viatura} onChangeText={(value)=>updateFormData("viatura",value)} placeholder="Digite a viatura empregada"/>
 </InputGroup>
 <InputGroup label="Número da Viatura">
   <TextInput value={formData.numeroViatura} onChangeText={(value)=>updateFormData("numeroViatura",value)} placeholder="Digite o número da viatura"/>
 </InputGroup>
 <InputGroup label="Forma de Acionamento">
   <PickerInput selectedValue={formData.acionamento} onValueChange={(value)=>updateFormData("acionamento",value)} items={ACIONAMENTOS} placeholder="Selecione a Forma de Acionamento"/>
 </InputGroup>
 <InputGroup label="Local do Acionamento">
   <TextInput value={formData.localAcionamento} onChangeText={(value)=>updateFormData("localAcionamento",value)} placeholder="Digite o local do acionamento"/>
 </InputGroup>
</Section>

{/* Seção Endereço */}
<Section title="Endereço da Ocorrência">
 <InputGroup label="Município" required>
   <SearchablePicker selectedValue={formData.municipio} onValueChange={(value)=>updateFormData("municipio",value)} items={MUNICIPIOS_PERNAMBUCO} placeholder="Selecione o município"/>
 </InputGroup>
 <InputGroup label="Região" required>
   <PickerInput selectedValue={formData.regiao} onValueChange={(value)=>updateFormData("regiao",value)} items={REGIOES} placeholder="Selecione a região"/>
 </InputGroup>
 <InputGroup label="Bairro">
   <TextInput value={formData.bairro} onChangeText={(value)=>updateFormData("bairro",value)} placeholder="Digite o bairro"/>
 </InputGroup>
 <InputGroup label="Tipo de Logradouro" required>
   <PickerInput selectedValue={formData.tipoLogradouro} onValueChange={(value)=>updateFormData("tipoLogradouro",value)} items={TIPOS_LOGRADOURO} placeholder="Selecione o Tipo de Logradouro"/>
 </InputGroup>
 <InputGroup label="AIS">
   <TextInput value={formData.ais} onChangeText={handleAISChange} onBlur={handleAISBlur} placeholder="AIS 1-10" keyboardType="numeric" maxLength={2}/>
   <Text style={[styles.helperText,{ color : colors.textSecondary }]}>AIS deve ser entre 1 e 10</Text>
 </InputGroup>
 <InputGroup label="Logradouro" required>
   <TextInput value={formData.logradouro} onChangeText={(value)=>updateFormData("logradouro",value)} placeholder="Digite o logradouro"/>
 </InputGroup>
 <View style={styles.row}>
   <InputGroup label="Latitude" style={styles.flex1}>
     <TextInput value={formData.latitude} onChangeText={(value)=>updateFormData("latitude",value)} placeholder="Digite a latitude" keyboardType="numbers-and-punctuation"/>
   </InputGroup>
   <InputGroup label="Longitude" style={[styles.flex1, styles.marginLeft]}>
     <TextInput value={formData.longitude} onChangeText={(value)=>updateFormData("longitude",value)} placeholder="Digite a longitude" keyboardType="numbers-and-punctuation"/>
   </InputGroup>
 </View>
</Section>

{/* Seção Registro Fotográfico */}
<Section title="Registro Fotográfico">
<View style={styles.photoSection}>
{fotoOcorrencia ? (
<View style={photoPreviewContainerStyle}>
<Image source={{ uri : fotoOcorrencia.uri }} style={styles.photoPreview} resizeMode="cover"/>
<Text style={[styles.photoInfo,{ color : colors.textSecondary }]}>Foto:{fotoOcorrencia.fileName||"sem nome"}</Text>
<View style={styles.photoActions}>
<TouchableOpacity style={retakeButtonStyle} onPress={mostrarOpcoesFoto}>
<Text style={[styles.photoButtonText,{ color : colors.textOnPrimary }]}>🔄 Alterar</Text></TouchableOpacity>
<TouchableOpacity style={removeButtonStyle} onPress={removerFoto}>
<Text style={[styles.photoButtonText,{ color : colors.textOnPrimary }]}>🗑️ Remover</Text></TouchableOpacity></View></View>)
:
(<TouchableOpacity style={cameraButtonStyle} onPress={mostrarOpcoesFoto} activeOpacity={0.7}>
<View style={styles.cameraButtonContent}>
<CameraIconWithTheme/>
<Text style={[styles.cameraButtonText,{ color : colors.primary }]}>Adicionar Foto da Ocorrência</Text>
<Text style={[styles.cameraButtonSubtext,{ color : colors.textSecondary }]}>Toque para tirar uma foto ou escolher da galeria</Text></View></TouchableOpacity>)}
</View></Section>

{/* Botões de ação */}
<View style={styles.buttonContainer}>
<TouchableOpacity style={getActionButtonStyle("clear",false)} onPress={handleClear}>
<Text style={getActionButtonTextStyle()}>Limpar</Text></TouchableOpacity>

<TouchableOpacity style={getActionButtonStyle("save",enviando)} onPress={handleSave} disabled={enviando}>
<Text style={getActionButtonTextStyle()}>{enviando?"Salvando...":"Salvar Ocorrência"}</Text></TouchableOpacity></View>

<View style={styles.requiredNote}>
<Text style={requiredTextStyle}>* Campos obrigatórios</Text>
<Text style={[requiredTextStyle,{ fontWeight:"bold"}]}>FIRE ALPHA</Text></View>

</KeyboardAwareScrollView></View>);
};

// Apenas layout! Não coloque cores aqui!
const styles=StyleSheet.create({
container:{ flex :1 },
scrollView:{ flex :1 },
scrollContent:{ padding :16,paddingBottom :30 },
row:{ flexDirection :"row"},
flex1:{ flex :1},
marginLeft:{ marginLeft :8},
buttonGroup:{ flexDirection :"row",justifyContent :"space-between",marginTop :8},
textArea:{ height :80,textAlignVertical :"top"},
buttonContainer:{ flexDirection :"row",justifyContent :"space-between",marginTop :20,marginBottom :10},
requiredNote:{ alignItems :"center",marginBottom :20},
pickerContainer:{ borderWidth :1,borderRadius :8,overflow :"hidden",marginTop :4},
charCounter:{ fontSize :12,textAlign :"right",marginTop :4},
autoGeneratedInput:{ borderWidth :1,borderRadius :8,padding :12,fontSize :16},
helperText:{ fontSize :11,fontStyle :"italic",marginTop :4},
photoSection:{ marginVertical :10},
cameraButton:{ borderWidth :2,borderStyle :"dashed",borderRadius :12,padding :20},
cameraButtonContent:{ alignItems :"center"},
cameraButtonIcon:{ fontSize :40,marginBottom :10},
cameraButtonText:{ fontSize :16,fontWeight :"600",textAlign :"center",marginBottom :5},
cameraButtonSubtext:{ fontSize :12,textAlign :"center"},
photoPreviewContainer:{ alignItems :"center",borderRadius :12,padding :15},
photoPreview:{ width :"100%",height :250,borderRadius :8,marginBottom :10},
photoInfo:{ fontSize :12,marginBottom :15,textAlign :"center"},
photoActions:{ flexDirection :"row",justifyContent :"space-around",width :"100%"},
photoButton:{ paddingHorizontal :20,paddingVertical :12,borderRadius :8,minWidth :120,alignItems :"center",flexDirection :"row",justifyContent :"center"},
photoButtonText:{ fontWeight :"600",fontSize :14,marginLeft :5},
});

const CameraIconWithTheme=()=>{const{colors}=useTheme();return<CameraIcon width={40} height={40} color={colors.primary}/>;};

export default NovaOcorrenciaScreen;