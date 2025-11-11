// screens/NovaOcorrenciaScreen.js
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { REGIOES } from '../constants/pickerData';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Switch
} from 'react-native';

// Import dos componentes
import Section from '../components/Section';
import InputGroup from '../components/InputGroup';
import TimeInput from '../components/TimeInput';
import DatePickerInput from '../components/DatePickerInput';
import PickerInput from '../components/PickerInput';
import TextInput from '../components/TextInput';

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
  TIPOS_LOGRADOURO
} from '../constants/pickerData';

const NovaOcorrenciaScreen = ({ navigation }) => {
  // Estado principal do formulário
  const [formData, setFormData] = useState({
    // Dados Internos
    numeroAviso: '',
    diretoria: 'DIM',
    grupamento: '',
    pontoBase: '',
    
    // Ocorrência
    natureza: '',
    grupoOcorrencia: '',
    subgrupoOcorrencia: '',
    situacao: '',
    horaSaidaQuartel: '',
    horaLocal: '',
    horaSaidaLocal: '',
    motivoNaoAtendida: '',
    vitimaSamu: false,
    
    // Vítima
    envolvida: false,
    sexo: '',
    idade: '',
    classificacao: '',
    destino: '',
    
    // Viatura
    viatura: '',
    numeroViatura: '',
    acionamento: '',
    localAcionamento: '',
    
    // Endereço
    municipio: '',
    regiao: '',
    bairro: '',
    tipoLogradouro: '',
    ais: '',
    logradouro: '',
    latitude: '',
    longitude: '',
  });

  const [dataHora, setDataHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Função para atualizar o formData
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Função para lidar com mudança de data
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataHora(selectedDate);
    }
  };

  // Validação do formulário (apenas validações não-obrigatórias)
  const validateForm = () => {
    // Validação do formato de hora (mantida)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    
    if (formData.horaSaidaQuartel && !timeRegex.test(formData.horaSaidaQuartel)) {
      Alert.alert(
        'Formato Inválido',
        'O formato da hora de saída do quartel deve ser HH:MM:SS',
        [{ text: 'OK' }]
      );
      return false;
    }

    if (formData.horaLocal && !timeRegex.test(formData.horaLocal)) {
      Alert.alert(
        'Formato Inválido',
        'O formato da hora de chegada no local deve ser HH:MM:SS',
        [{ text: 'OK' }]
      );
      return false;
    }

    if (formData.horaSaidaLocal && !timeRegex.test(formData.horaSaidaLocal)) {
      Alert.alert(
        'Formato Inválido',
        'O formato da hora de saída do local deve ser HH:MM:SS',
        [{ text: 'OK' }]
      );
      return false;
    }

    return true;
  };

  // Função para salvar a ocorrência
  const handleSave = () => {
    if (!validateForm()) return;

    // Pop-up de confirmação
    Alert.alert(
      'Confirmar Salvamento',
      'Tem certeza que deseja salvar esta ocorrência?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            const ocorrenciaData = {
              ...formData,
              dataHora: dataHora.toISOString(),
            };

            console.log('Dados da ocorrência:', ocorrenciaData);
            
            Alert.alert(
              'Sucesso',
              'Ocorrência salva com sucesso!',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack()
                }
              ]
            );
          }
        }
      ]
    );
  };

  // Função para limpar o formulário
  const handleClear = () => {
    Alert.alert(
      'Limpar Formulário',
      'Tem certeza que deseja limpar todos os campos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpar', 
          style: 'destructive',
          onPress: () => {
            setFormData({
              numeroAviso: '',
              diretoria: 'DIM',
              grupamento: '',
              pontoBase: '',
              natureza: '',
              grupoOcorrencia: '',
              subgrupoOcorrencia: '',
              situacao: '',
              horaSaidaQuartel: '',
              horaLocal: '',
              horaSaidaLocal: '',
              motivoNaoAtendida: '',
              vitimaSamu: false,
              envolvida: false,
              sexo: '',
              idade: '',
              classificacao: '',
              destino: '',
              viatura: '',
              numeroViatura: '',
              acionamento: '',
              localAcionamento: '',
              municipio: '',
              regiao: '',
              bairro: '',
              tipoLogradouro: '',
              ais: '',
              logradouro: '',
              latitude: '',
              longitude: '',
            });
            setDataHora(new Date());
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        
        {/*Seção: Dados Internos */}
        <Section title="Dados Internos">
          <InputGroup label="Data e Hora">
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
              onChangeText={(value) => updateFormData('numeroAviso', value)}
              placeholder="Digite o número do aviso"
            />
          </InputGroup>

          <InputGroup label="Diretoria">
            <TextInput
              value={formData.diretoria}
              onChangeText={(value) => updateFormData('diretoria', value)}
              placeholder="Digite a diretoria"
            />
          </InputGroup>

          <InputGroup label="Grupamento">
            <PickerInput
              selectedValue={formData.grupamento}
              onValueChange={(value) => updateFormData('grupamento', value)}
              items={GRUPAMENTOS}
              placeholder="Selecione o grupamento"
            />
          </InputGroup>

          <InputGroup label="Ponto Base">
            <TextInput
              value={formData.pontoBase}
              onChangeText={(value) => updateFormData('pontoBase', value)}
              placeholder="Digite o ponto base"
            />
          </InputGroup>
        </Section>

        {/* Seção: Ocorrência */}
        <Section title="Ocorrência">
          <InputGroup label="Natureza da Ocorrência">
            <PickerInput
              selectedValue={formData.natureza}
              onValueChange={(value) => updateFormData('natureza', value)}
              items={NATUREZAS}
              placeholder="Selecione a Natureza da Ocorrência"
            />
          </InputGroup>

          <InputGroup label="Grupo da Ocorrência">
            <PickerInput
              selectedValue={formData.grupoOcorrencia}
              onValueChange={(value) => updateFormData('grupoOcorrencia', value)}
              items={GRUPOS_OCORRENCIA}
              placeholder="Selecione o Grupo de Ocorrência"
            />
          </InputGroup>

          <InputGroup label="Subgrupo da Ocorrência">
            <PickerInput
              selectedValue={formData.subgrupoOcorrencia}
              onValueChange={(value) => updateFormData('subgrupoOcorrencia', value)}
              items={SUBGRUPOS_OCORRENCIA}
              placeholder="Selecione o Subgrupo da Ocorrência"
            />
          </InputGroup>

          <InputGroup label="Situação da Ocorrência">
            <PickerInput
              selectedValue={formData.situacao}
              onValueChange={(value) => updateFormData('situacao', value)}
              items={SITUACOES}
              placeholder="Selecione a Situação da Ocorrência"
            />
          </InputGroup>

          {/* Horários */}
          <View style={styles.row}>
            <InputGroup label="Saída do Quartel" style={styles.flex1}>
              <TimeInput
                value={formData.horaSaidaQuartel}
                onChangeText={(value) => updateFormData('horaSaidaQuartel', value)}
                placeholder="HH:MM:SS"
                showValidation={true}
              />
            </InputGroup>
            
            <InputGroup label="Chegada no Local" style={[styles.flex1, styles.marginLeft]}>
              <TimeInput
                value={formData.horaLocal}
                onChangeText={(value) => updateFormData('horaLocal', value)}
                placeholder="HH:MM:SS"
                showValidation={true}
              />
            </InputGroup>
          </View>

          {/* Motivo para ocorrência não atendida */}
          {formData.situacao === 'Não atendida' && (
            <InputGroup label="Motivo da Não Atendimento">
              <TextInput
                value={formData.motivoNaoAtendida}
                onChangeText={(value) => updateFormData('motivoNaoAtendida', value)}
                placeholder="Digite o motivo"
                multiline
                numberOfLines={3}
                style={styles.textArea}
              />
            </InputGroup>
          )}

          <InputGroup label="Saída do Local">
            <TimeInput
              value={formData.horaSaidaLocal}
              onChangeText={(value) => updateFormData('horaSaidaLocal', value)}
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
                onValueChange={(value) => updateFormData('vitimaSamu', value)}
                trackColor={{ false: '#767577', true: '#40a02b' }}
                thumbColor={formData.vitimaSamu ? '#f4f3f4' : '#f4f3f4'}
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
                onValueChange={(value) => updateFormData('envolvida', value)}
                trackColor={{ false: '#767577', true: '#40a02b' }}
                thumbColor={formData.envolvida ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
              <Text style={styles.switchLabel}>SIM</Text>
            </View>
          </View>

          <InputGroup label="Sexo da Vítima">
            <PickerInput
              selectedValue={formData.sexo}
              onValueChange={(value) => updateFormData('sexo', value)}
              items={SEXOS}
              placeholder="Selecione o sexo da vítima"
            />
          </InputGroup>

          <InputGroup label="Idade da Vítima">
            <TextInput
              value={formData.idade}
              onChangeText={(value) => updateFormData('idade', value)}
              placeholder="Digite a idade"
              keyboardType="numeric"
            />
          </InputGroup>

          <InputGroup label="Classificação da Vítima">
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.classificacao}
                onValueChange={(value) => updateFormData('classificacao', value)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione a Classificação da Vítima" value="" />
                {CLASSIFICACOES.map((item) => (
                  <Picker.Item 
                    key={item.value} 
                    label={item.label} 
                    value={item.value} 
                  />
                ))}
              </Picker>
            </View>
          </InputGroup>

          <InputGroup label="Destino da Vítima">
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.destino}
                onValueChange={(value) => updateFormData('destino', value)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione o Destino da Vítima" value="" />
                {DESTINOS.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
          </InputGroup>
        </Section>

        {/* Seção: Viatura e Acionamento */}
        <Section title="Viatura e Acionamento">
          <InputGroup label="Viatura Empregada">
            <TextInput
              value={formData.viatura}
              onChangeText={(value) => updateFormData('viatura', value)}
              placeholder="Digite a viatura empregada"
            />
          </InputGroup>

          <InputGroup label="Número da Viatura">
            <TextInput
              value={formData.numeroViatura}
              onChangeText={(value) => updateFormData('numeroViatura', value)}
              placeholder="Digite o número da viatura"
            />
          </InputGroup>

          <InputGroup label="Forma de Acionamento">
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.acionamento}
                onValueChange={(value) => updateFormData('acionamento', value)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione a Forma de Acionamento" value="" />
                {ACIONAMENTOS.map((item) => (
                  <Picker.Item 
                    key={item.value} 
                    label={item.label} 
                    value={item.value} 
                  />
                ))}
              </Picker>
            </View>
          </InputGroup>

          <InputGroup label="Local do Acionamento">
            <TextInput
              value={formData.localAcionamento}
              onChangeText={(value) => updateFormData('localAcionamento', value)}
              placeholder="Digite o local do acionamento"
            />
          </InputGroup>
        </Section>

        {/* Seção: Endereço */}
        <Section title="Endereço da Ocorrência">
          <InputGroup label="Município">
            <TextInput
              value={formData.municipio}
              onChangeText={(value) => updateFormData('municipio', value)}
              placeholder="Digite o município"
            />
          </InputGroup>

          <InputGroup label="Região">
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.regiao}
                onValueChange={(value) => updateFormData('regiao', value)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione a região" value="" />
                {REGIOES.map((regiao) => (
                  <Picker.Item 
                    key={regiao.value} 
                    label={regiao.label} 
                    value={regiao.value} 
                  />
                ))}
              </Picker>
            </View>
          </InputGroup>

          <InputGroup label="Bairro">
            <TextInput
              value={formData.bairro}
              onChangeText={(value) => updateFormData('bairro', value)}
              placeholder="Digite o bairro"
            />
          </InputGroup>

          <InputGroup label="Tipo de Logradouro">
            <PickerInput
              selectedValue={formData.tipoLogradouro}
              onValueChange={(value) => updateFormData('tipoLogradouro', value)}
              items={TIPOS_LOGRADOURO}
              placeholder="Selecione o Tipo de Logradouro"
            />
          </InputGroup>

          <InputGroup label="AIS">
            <TextInput
              value={formData.ais}
              onChangeText={(value) => updateFormData('ais', value)}
              placeholder="Digite o AIS"
              keyboardType="numeric"
            />
          </InputGroup>

          <InputGroup label="Logradouro">
            <TextInput
              value={formData.logradouro}
              onChangeText={(value) => updateFormData('logradouro', value)}
              placeholder="Digite o logradouro"
            />
          </InputGroup>

          <View style={styles.row}>
            <InputGroup label="Latitude" style={styles.flex1}>
              <TextInput
                value={formData.latitude}
                onChangeText={(value) => updateFormData('latitude', value)}
                placeholder="Digite a latitude"
                keyboardType="numbers-and-punctuation"
              />
            </InputGroup>
            
            <InputGroup label="Longitude" style={[styles.flex1, styles.marginLeft]}>
              <TextInput
                value={formData.longitude}
                onChangeText={(value) => updateFormData('longitude', value)}
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
            style={[styles.button, styles.saveButton]} 
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Salvar Ocorrência</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requiredNote}>
          <Text style={styles.requiredText}>FIRE ALPHA</Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Os estilos permanecem os mesmos...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
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
  switchContainer: {
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  switchLabel: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  clearButton: {
    backgroundColor: '#6c757d',
  },
  saveButton: {
    backgroundColor: '#bc010c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  requiredNote: {
    alignItems: 'center',
    marginBottom: 20,
  },
  requiredText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: 4,
  },
  picker: {
    height: 56,
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 8,
  },
});

export default NovaOcorrenciaScreen;