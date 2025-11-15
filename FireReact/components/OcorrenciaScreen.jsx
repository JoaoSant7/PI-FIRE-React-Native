import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';

// Import dos componentes
import Section from './components/Section';
import InputGroup from './components/InputGroup';
import TimeInput from './components/TimeInput';
import DatePickerInput from './components/DatePickerInput';
import PickerInput from './components/PickerInput';

// Dados para os Pickers
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
  TIPOS_LOGRADOURO
} from './constants/pickerData';

const OcorrenciaScreen = () => {
  const { colors } = useTheme();
  // Estados principais
  const [formData, setFormData] = useState({
    // Vítima
    envolvida: true,
    sexo: 'Masculino',
    idade: '',
    classificacao: 'Vítima ilesa',
    destino: 'Entregue ao Hospital',
    
    // Viatura
    viatura: '',
    numeroViatura: '',
    acionamento: 'PESSOALMENTE',
    localAcionamento: '',
    
    // Endereço
    municipio: '',
    regiao: '',
    bairro: '',
    tipoLogradouro: 'AVENIDA',
    ais: '',
    logradouro: '',
    latitude: '',
    longitude: '',
    
    // Dados internos
    numeroAviso: '',
    diretoria: 'DIM',
    grupamento: '',
    pontoBase: '',
    natureza: 'APH',
    grupoOcorrencia: 'Emergências Clínicas Diversas',
    subgrupoOcorrencia: 'Queda da Própria Altura',
    situacao: 'Atendida',
    horaSaidaQuartel: '',
    horaLocal: '',
    horaSaidaLocal: '',
    motivoNaoAtendida: '',
    vitimaSamu: false,
  });

  const [dataHora, setDataHora] = useState(new Date());
  const [dataAcionamento, setDataAcionamento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Função para atualizar o formData
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    Alert.alert('Sucesso', 'Ocorrência salva com sucesso!');
  };

  const handleClear = () => {
    setFormData({
      envolvida: true,
      sexo: 'Masculino',
      idade: '',
      classificacao: 'Vítima ilesa',
      destino: 'Entregue ao Hospital',
      viatura: '',
      numeroViatura: '',
      acionamento: 'PESSOALMENTE',
      localAcionamento: '',
      municipio: '',
      regiao: '',
      bairro: '',
      tipoLogradouro: 'AVENIDA',
      ais: '',
      logradouro: '',
      latitude: '',
      longitude: '',
      numeroAviso: '',
      diretoria: 'DIM',
      grupamento: '',
      pontoBase: '',
      natureza: 'APH',
      grupoOcorrencia: 'Emergências Clínicas Diversas',
      subgrupoOcorrencia: 'Queda da Própria Altura',
      situacao: 'Atendida',
      horaSaidaQuartel: '',
      horaLocal: '',
      horaSaidaLocal: '',
      motivoNaoAtendida: '',
      vitimaSamu: false,
    });
    setDataHora(new Date());
    setDataAcionamento(new Date());
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataHora(selectedDate);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <ScrollView style={styles.scrollView}>
        
        {/* Dados Internos */}
        <Section title="Dados internos">
          <InputGroup label="Data e hora:">
            <DatePickerInput
              value={dataHora}
              onDateChange={onDateChange}
              showPicker={showDatePicker}
              setShowPicker={setShowDatePicker}
            />
          </InputGroup>

          <InputGroup label="N° do aviso (I-NETOISPATCHER):">
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.inputText }]}
              value={formData.numeroAviso}
              onChangeText={(value) => updateFormData('numeroAviso', value)}
              placeholder="Digite o número do aviso"
              placeholderTextColor={colors.inputPlaceholder}
            />
          </InputGroup>

          <InputGroup label="Diretoria:">
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.inputText }]}
              value={formData.diretoria}
              onChangeText={(value) => updateFormData('diretoria', value)}
              placeholder="Digite a diretoria"
              placeholderTextColor={colors.inputPlaceholder}
            />
          </InputGroup>

          <InputGroup label="Grupamento:">
            <PickerInput
              selectedValue={formData.grupamento}
              onValueChange={(value) => updateFormData('grupamento', value)}
              items={GRUPAMENTOS}
              placeholder="Selecione o grupamento"
            />
          </InputGroup>

          <InputGroup label="Ponto base:">
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.inputText }]}
              value={formData.pontoBase}
              onChangeText={(value) => updateFormData('pontoBase', value)}
              placeholder="Digite o ponto base"
              placeholderTextColor={colors.inputPlaceholder}
            />
          </InputGroup>
        </Section>

        {/* Ocorrência */}
        <Section title="Ocorrência">
          <InputGroup label="Natureza da ocorrência:">
            <PickerInput
              selectedValue={formData.natureza}
              onValueChange={(value) => updateFormData('natureza', value)}
              items={NATUREZAS}
            />
          </InputGroup>

          <InputGroup label="Grupo da ocorrência:">
            <PickerInput
              selectedValue={formData.grupoOcorrencia}
              onValueChange={(value) => updateFormData('grupoOcorrencia', value)}
              items={GRUPOS_OCORRENCIA}
            />
          </InputGroup>

          <InputGroup label="Subgrupo da ocorrência:">
            <PickerInput
              selectedValue={formData.subgrupoOcorrencia}
              onValueChange={(value) => updateFormData('subgrupoOcorrencia', value)}
              items={SUBGRUPOS_OCORRENCIA}
            />
          </InputGroup>

          <InputGroup label="Situação da ocorrência:">
            <PickerInput
              selectedValue={formData.situacao}
              onValueChange={(value) => updateFormData('situacao', value)}
              items={SITUACOES}
            />
          </InputGroup>

          <View style={styles.row}>
            <InputGroup label="Horário de saída do quartel:" style={styles.flex1}>
              <TimeInput
                value={formData.horaSaidaQuartel}
                onChangeText={(value) => updateFormData('horaSaidaQuartel', value)}
                placeholder="HH:MM:SS"
              />
            </InputGroup>
            
            <InputGroup label="Horário no local:" style={[styles.flex1, styles.marginLeft]}>
              <TimeInput
                value={formData.horaLocal}
                onChangeText={(value) => updateFormData('horaLocal', value)}
                placeholder="HH:MM:SS"
              />
            </InputGroup>
          </View>

          {formData.situacao === 'Não atendida' && (
            <InputGroup label="Ocorrência não atendida - Motivo:">
              <TextInput
                  style={[styles.input, styles.textArea, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.inputText }]}
                  value={formData.motivoNaoAtendida}
                  onChangeText={(value) => updateFormData('motivoNaoAtendida', value)}
                  multiline
                  numberOfLines={3}
                  placeholder="Digite o motivo"
                  placeholderTextColor={colors.inputPlaceholder}
                />
            </InputGroup>
          )}

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima socorrida pelo SAMU:</Text>
            <Switch
              value={formData.vitimaSamu}
              onValueChange={(value) => updateFormData('vitimaSamu', value)}
            />
          </View>

          <InputGroup label="Horário de saída do local:">
            <TimeInput
              value={formData.horaSaidaLocal}
              onChangeText={(value) => updateFormData('horaSaidaLocal', value)}
              placeholder="HH:MM:SS"
            />
          </InputGroup>
        </Section>

        {/* Informações da Vítima */}
        <Section title="Informações da vítima">
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima envolvida:</Text>
            <Switch
              value={formData.envolvida}
              onValueChange={(value) => updateFormData('envolvida', value)}
            />
            <Text style={styles.switchLabel}>
              {formData.envolvida ? 'Sim' : 'Não'}
            </Text>
          </View>

          <InputGroup label="Sexo da vítima:">
            <PickerInput
              selectedValue={formData.sexo}
              onValueChange={(value) => updateFormData('sexo', value)}
              items={SEXOS}
            />
          </InputGroup>

          <InputGroup label="Idade da vítima:">
            <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.inputText }]}
                value={formData.idade}
                onChangeText={(value) => updateFormData('idade', value)}
                placeholder="Digite a idade"
                placeholderTextColor={colors.inputPlaceholder}
                keyboardType="numeric"
              />
          </InputGroup>

          <InputGroup label="Classificação da vítima:">
            <PickerInput
              selectedValue={formData.classificacao}
              onValueChange={(value) => updateFormData('classificacao', value)}
              items={CLASSIFICACOES}
            />
          </InputGroup>

          <InputGroup label="Destino da vítima:">
            <PickerInput
              selectedValue={formData.destino}
              onValueChange={(value) => updateFormData('destino', value)}
              items={DESTINOS}
            />
          </InputGroup>
        </Section>

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.clearButton, { backgroundColor: colors.error }]} onPress={handleClear}>
            <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton, { backgroundColor: colors.success }]} onPress={handleSave}>
            <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  clearButton: {
  },
  saveButton: {
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default OcorrenciaScreen;