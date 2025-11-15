// components/DatePickerInput.js
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const DatePickerInput = ({
  value,
  onDateChange,
  showPicker,
  setShowPicker,
  placeholder = "Selecione a data e hora",
  mode = 'datetime'
}) => {
  const { colors } = useTheme();
  const currentDate = value || new Date();
  const [tempDate, setTempDate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes()
  });

  const [inputValues, setInputValues] = useState({
    day: currentDate.getDate().toString(),
    month: (currentDate.getMonth() + 1).toString(),
    year: currentDate.getFullYear().toString(),
    hour: currentDate.getHours().toString(),
    minute: currentDate.getMinutes().toString()
  });

  const formatDate = (date) => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleConfirm = () => {
    // Validar todos os campos antes de criar a data
    const validatedDate = {
      day: Math.max(1, Math.min(31, tempDate.day)),
      month: Math.max(1, Math.min(12, tempDate.month)),
      year: Math.max(2000, Math.min(2100, tempDate.year)),
      hour: Math.max(0, Math.min(23, tempDate.hour)),
      minute: Math.max(0, Math.min(59, tempDate.minute))
    };

    const newDate = new Date(
      validatedDate.year,
      validatedDate.month - 1,
      validatedDate.day,
      validatedDate.hour,
      validatedDate.minute
    );
    onDateChange(null, newDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const updateField = (field, textValue) => {
    // Atualizar o valor de exibição (string)
    setInputValues(prev => ({
      ...prev,
      [field]: textValue
    }));

    // Converter para número e validar apenas se for um número válido
    const numValue = parseInt(textValue);
    
    if (!isNaN(numValue)) {
      let validatedValue = numValue;

      // Aplicar validações apenas quando o campo perde o foco ou quando está completo
      switch (field) {
        case 'day':
          validatedValue = Math.max(1, Math.min(31, numValue));
          break;
        case 'month':
          validatedValue = Math.max(1, Math.min(12, numValue));
          break;
        case 'year':
          // Para ano, permitir digitação livre, só validar no confirmar
          validatedValue = numValue;
          break;
        case 'hour':
          validatedValue = Math.max(0, Math.min(23, numValue));
          break;
        case 'minute':
          validatedValue = Math.max(0, Math.min(59, numValue));
          break;
      }

      setTempDate(prev => ({
        ...prev,
        [field]: validatedValue
      }));

      // Atualizar o valor de exibição com o valor validado (exceto para ano)
      if (field !== 'year') {
        setInputValues(prev => ({
          ...prev,
          [field]: validatedValue.toString()
        }));
      }
    }
  };

  const handleBlur = (field) => {
    // Quando o campo perde o foco, aplicar validação final
    const currentValue = inputValues[field];
    const numValue = parseInt(currentValue);
    
    if (!isNaN(numValue)) {
      let validatedValue = numValue;

      switch (field) {
        case 'day':
          validatedValue = Math.max(1, Math.min(31, numValue));
          break;
        case 'month':
          validatedValue = Math.max(1, Math.min(12, numValue));
          break;
        case 'year':
          validatedValue = Math.max(2000, Math.min(2100, numValue));
          break;
        case 'hour':
          validatedValue = Math.max(0, Math.min(23, numValue));
          break;
        case 'minute':
          validatedValue = Math.max(0, Math.min(59, numValue));
          break;
      }

      setTempDate(prev => ({
        ...prev,
        [field]: validatedValue
      }));

      setInputValues(prev => ({
        ...prev,
        [field]: validatedValue.toString()
      }));
    }
  };

  const renderNumberInput = (label, field, maxLength = 2) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        style={[
          styles.numberInput,
          {
            borderColor: colors.inputBorder,
            backgroundColor: colors.surface,
            color: colors.inputText,
          }
        ]}
        value={inputValues[field]}
        onChangeText={(text) => updateField(field, text)}
        onBlur={() => handleBlur(field)}
        keyboardType="number-pad"
        maxLength={maxLength}
        selectTextOnFocus
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.input,
          {
            borderColor: colors.inputBorder,
            backgroundColor: colors.inputBackground,
          }
        ]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[value ? styles.text : styles.placeholder, { color: value ? colors.inputText : colors.inputPlaceholder }]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <KeyboardAvoidingView 
          style={[styles.modalOverlay, { backgroundColor: colors.backdrop }]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Selecionar Data e Hora</Text>
            
            <View style={styles.dateSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Data</Text>
              <View style={styles.row}>
                {renderNumberInput('Dia', 'day')}
                {renderNumberInput('Mês', 'month')}
                {renderNumberInput('Ano', 'year', 4)}
              </View>
            </View>

            {(mode === 'datetime' || mode === 'time') && (
              <View style={styles.timeSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Hora</Text>
                <View style={styles.row}>
                  {renderNumberInput('Hora', 'hour')}
                  {renderNumberInput('Minuto', 'minute')}
                </View>
              </View>
            )}

            <View style={[styles.preview, { backgroundColor: colors.surface }]}>
              <Text style={[styles.previewText, { color: colors.text }]}>
                {formatDate(new Date(
                  tempDate.year,
                  tempDate.month - 1,
                  tempDate.day,
                  tempDate.hour,
                  tempDate.minute
                ))}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton, { backgroundColor: colors.textSecondary }]} 
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.confirmButton, { backgroundColor: colors.info }]} 
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    minHeight: 50,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  placeholder: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  dateSection: {
    marginBottom: 20,
  },
  timeSection: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  numberInput: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  preview: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {},
  confirmButton: {},
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DatePickerInput;