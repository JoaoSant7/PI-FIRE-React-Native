import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const OcorrenciaScreen = () => {
  // Estados para informações da vítima
  const [envolvida, setEnvolvida] = useState(true);
  const [sexo, setSexo] = useState('Masculino');
  const [idade, setIdade] = useState('');
  const [classificacao, setClassificacao] = useState('Vítima ilesa');
  const [destino, setDestino] = useState('Entregue ao Hospital');

  // Estados para viatura
  const [viatura, setViatura] = useState('');
  const [numeroViatura, setNumeroViatura] = useState('');
  const [acionamento, setAcionamento] = useState('PESSOALMENTE');
  const [localAcionamento, setLocalAcionamento] = useState('');

  // Estados para endereço
  const [municipio, setMunicipio] = useState('');
  const [regiao, setRegiao] = useState('');
  const [bairro, setBairro] = useState('');
  const [tipoLogradouro, setTipoLogradouro] = useState('AVENIDA');
  const [ais, setAis] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Estados para dados internos
  const [dataHora, setDataHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [numeroAviso, setNumeroAviso] = useState('');
  const [diretoria, setDiretoria] = useState('');
  const [grupamento, setGrupamento] = useState('');
  const [pontoBase, setPontoBase] = useState('');
  const [dataAcionamento, setDataAcionamento] = useState(new Date());

  // Estados para ocorrência
  const [natureza, setNatureza] = useState('APH');
  const [grupoOcorrencia, setGrupoOcorrencia] = useState('Emergências Clínicas Diversas');
  const [subgrupoOcorrencia, setSubgrupoOcorrencia] = useState('Queda da Própria Altura');
  const [situacao, setSituacao] = useState('Atendida');
  const [horaSaidaQuartel, setHoraSaidaQuartel] = useState('');
  const [horaLocal, setHoraLocal] = useState('');
  const [horaSaidaLocal, setHoraSaidaLocal] = useState('');
  const [ocorrenciaNaoAtendida, setOcorrenciaNaoAtendida] = useState(false);
  const [motivoNaoAtendida, setMotivoNaoAtendida] = useState('');
  const [vitimaSamu, setVitimaSamu] = useState(false);

  const handleSave = () => {
    Alert.alert('Sucesso', 'Ocorrência salva com sucesso!');
  };

  const handleClear = () => {
    setEnvolvida(true);
    setSexo('Masculino');
    setIdade('');
    setClassificacao('Vítima ilesa');
    setDestino('Entregue ao Hospital');
    setViatura('');
    setNumeroViatura('');
    setAcionamento('PESSOALMENTE');
    setLocalAcionamento('');
    setMunicipio('');
    setRegiao('');
    setBairro('');
    setTipoLogradouro('AVENIDA');
    setAis('');
    setLogradouro('');
    setLatitude('');
    setLongitude('');
    setDataHora(new Date());
    setNumeroAviso('');
    setDiretoria('');
    setGrupamento('');
    setPontoBase('');
    setDataAcionamento(new Date());
    setNatureza('APH');
    setGrupoOcorrencia('Emergências Clínicas Diversas');
    setSubgrupoOcorrencia('Queda da Própria Altura');
    setSituacao('Atendida');
    setHoraSaidaQuartel('');
    setHoraLocal('');
    setHoraSaidaLocal('');
    setOcorrenciaNaoAtendida(false);
    setMotivoNaoAtendida('');
    setVitimaSamu(false);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataHora(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Informações da Vítima */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da vítima</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima envolvida:</Text>
            <Switch
              value={envolvida}
              onValueChange={setEnvolvida}
            />
            <Text style={styles.switchLabel}>{envolvida ? 'Sim' : 'Não'}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sexo da vítima:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={sexo}
                onValueChange={setSexo}
                style={styles.picker}
              >
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Feminino" value="Feminino" />
                <Picker.Item label="Outro" value="Outro" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Idade da vítima:</Text>
            <TextInput
              style={styles.input}
              value={idade}
              onChangeText={setIdade}
              placeholder="Digite a idade"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Classificação da vítima:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={classificacao}
                onValueChange={setClassificacao}
                style={styles.picker}
              >
                <Picker.Item label="Vítima ilesa" value="Vítima ilesa" />
                <Picker.Item label="Ferida leve" value="Ferida leve" />
                <Picker.Item label="Ferida grave" value="Ferida grave" />
                <Picker.Item label="Óbito" value="Óbito" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destino da vítima:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={destino}
                onValueChange={setDestino}
                style={styles.picker}
              >
                <Picker.Item label="Entregue ao Hospital" value="Entregue ao Hospital" />
                <Picker.Item label="Liberada no local" value="Liberada no local" />
                <Picker.Item label="Encaminhada à delegacia" value="Encaminhada à delegacia" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Viatura e Forma de acionamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Viatura e Forma de acionamento</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Viatura empregada:</Text>
            <TextInput
              style={styles.input}
              value={viatura}
              onChangeText={setViatura}
              placeholder="Digite a viatura empregada"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número da viatura:</Text>
            <TextInput
              style={styles.input}
              value={numeroViatura}
              onChangeText={setNumeroViatura}
              placeholder="Digite o número da viatura"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Forma de acionamento:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={acionamento}
                onValueChange={setAcionamento}
                style={styles.picker}
              >
                <Picker.Item label="PESSOALMENTE" value="PESSOALMENTE" />
                <Picker.Item label="TELEFONE" value="TELEFONE" />
                <Picker.Item label="RÁDIO" value="RÁDIO" />
                <Picker.Item label="OUTRO" value="OUTRO" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Local do acionamento:</Text>
            <TextInput
              style={styles.input}
              value={localAcionamento}
              onChangeText={setLocalAcionamento}
              placeholder="Digite o local do acionamento"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Município:</Text>
            <TextInput
              style={styles.input}
              value={municipio}
              onChangeText={setMunicipio}
              placeholder="Digite o município"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Região:</Text>
            <TextInput
              style={styles.input}
              value={regiao}
              onChangeText={setRegiao}
              placeholder="Digite a região"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bairro:</Text>
            <TextInput
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Digite o bairro"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de logradouro:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tipoLogradouro}
                onValueChange={setTipoLogradouro}
                style={styles.picker}
              >
                <Picker.Item label="AVENIDA" value="AVENIDA" />
                <Picker.Item label="RUA" value="RUA" />
                <Picker.Item label="TRAVESSA" value="TRAVESSA" />
                <Picker.Item label="ALAMEDA" value="ALAMEDA" />
                <Picker.Item label="ESTRADA" value="ESTRADA" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>AIS:</Text>
            <TextInput
              style={styles.input}
              value={ais}
              onChangeText={setAis}
              placeholder="Digite o AIS"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Logradouro:</Text>
            <TextInput
              style={styles.input}
              value={logradouro}
              onChangeText={setLogradouro}
              placeholder="Digite o logradouro"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Latitude:</Text>
              <TextInput
                style={styles.input}
                value={latitude}
                onChangeText={setLatitude}
                placeholder="Digite a latitude"
                placeholderTextColor="#999"
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1, styles.marginLeft]}>
              <Text style={styles.label}>Longitude:</Text>
              <TextInput
                style={styles.input}
                value={longitude}
                onChangeText={setLongitude}
                placeholder="Digite a longitude"
                placeholderTextColor="#999"
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>
        </View>

        {/* Dados Internos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados internos</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data e hora:</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={dataHora ? styles.dateText : styles.placeholderText}>
                {dataHora ? dataHora.toLocaleDateString('pt-BR') : 'Selecione a data e hora'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dataHora}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>N° do aviso (I-NETOISPATCHER):</Text>
            <TextInput
              style={styles.input}
              value={numeroAviso}
              onChangeText={setNumeroAviso}
              placeholder="Digite o número do aviso"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Diretoria:</Text>
            <TextInput
              style={styles.input}
              value={diretoria}
              onChangeText={setDiretoria}
              placeholder="Digite a diretoria"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Grupamento:</Text>
            <TextInput
              style={styles.input}
              value={grupamento}
              onChangeText={setGrupamento}
              placeholder="Digite o grupamento"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ponto base:</Text>
            <TextInput
              style={styles.input}
              value={pontoBase}
              onChangeText={setPontoBase}
              placeholder="Digite o ponto base"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data do acionamento:</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => {}}
            >
              <Text>{dataAcionamento.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ocorrência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ocorrência</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Natureza da ocorrência:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={natureza}
                onValueChange={setNatureza}
                style={styles.picker}
              >
                <Picker.Item label="APH" value="APH" />
                <Picker.Item label="Incêndio" value="Incêndio" />
                <Picker.Item label="Resgate" value="Resgate" />
                <Picker.Item label="Outros" value="Outros" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Grupo da ocorrência:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={grupoOcorrencia}
                onValueChange={setGrupoOcorrencia}
                style={styles.picker}
              >
                <Picker.Item label="Emergências Clínicas Diversas" value="Emergências Clínicas Diversas" />
                <Picker.Item label="Acidentes de Trânsito" value="Acidentes de Trânsito" />
                <Picker.Item label="Queimaduras" value="Queimaduras" />
                <Picker.Item label="Outros" value="Outros" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Subgrupo da ocorrência:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={subgrupoOcorrencia}
                onValueChange={setSubgrupoOcorrencia}
                style={styles.picker}
              >
                <Picker.Item label="Queda da Própria Altura" value="Queda da Própria Altura" />
                <Picker.Item label="Queda de Altura" value="Queda de Altura" />
                <Picker.Item label="Desmaio" value="Desmaio" />
                <Picker.Item label="Outros" value="Outros" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Situação da ocorrência:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={situacao}
                onValueChange={setSituacao}
                style={styles.picker}
              >
                <Picker.Item label="Atendida" value="Atendida" />
                <Picker.Item label="Não atendida" value="Não atendida" />
                <Picker.Item label="Cancelada" value="Cancelada" />
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Horário de saída do quartel:</Text>
              <TextInput
                style={styles.input}
                value={horaSaidaQuartel}
                onChangeText={setHoraSaidaQuartel}
                placeholder="HH:MM:SS"
                placeholderTextColor="#999"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1, styles.marginLeft]}>
              <Text style={styles.label}>Horário no local da ocorrência:</Text>
              <TextInput
                style={styles.input}
                value={horaLocal}
                onChangeText={setHoraLocal}
                placeholder="HH:MM:SS"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {situacao === 'Não atendida' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ocorrência não atendida - Motivo:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={motivoNaoAtendida}
                onChangeText={setMotivoNaoAtendida}
                multiline
                numberOfLines={3}
                placeholder="Digite o motivo da ocorrência não atendida"
                placeholderTextColor="#999"
              />
            </View>
          )}

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima socorrida pelo SAMU:</Text>
            <Switch
              value={vitimaSamu}
              onValueChange={setVitimaSamu}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Horário de saída do local:</Text>
            <TextInput
              style={styles.input}
              value={horaSaidaLocal}
              onChangeText={setHoraSaidaLocal}
              placeholder="HH:MM:SS"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Botões de ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar documento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.confirmButton]}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
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
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  dateText: {
    color: '#000',
  },
  placeholderText: {
    color: '#999',
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
    backgroundColor: '#ff6b6b',
  },
  saveButton: {
    backgroundColor: '#4ecdc4',
  },
  confirmButton: {
    backgroundColor: '#1a936f',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OcorrenciaScreen;