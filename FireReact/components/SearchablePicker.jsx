// components/SearchablePicker.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const SearchablePicker = ({
  selectedValue,
  onValueChange,
  items,
  placeholder = "Selecione uma opção",
  style,
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (searchText) {
      const filtered = items.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchText, items]);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
    setSearchText("");
    Keyboard.dismiss();
  };

  const handleClose = () => {
    setModalVisible(false);
    setSearchText("");
    Keyboard.dismiss();
  };

  const selectedItem = items.find((item) => item.value === selectedValue);
  const displayText = selectedItem ? selectedItem.label : placeholder;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.trigger, 
          {
            borderColor: colors.inputBorder,
            backgroundColor: colors.inputBackground,
          },
          style
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.triggerText, 
            !selectedValue && styles.placeholderText,
            {
              color: selectedValue ? colors.inputText : colors.textSecondary,
            }
          ]}
        >
          {displayText}
        </Text>
        <Text style={[styles.arrow, { color: colors.textSecondary }]}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={[styles.modalOverlay, { backgroundColor: colors.backdrop }]}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Selecione uma opção</Text>

                {/* Campo de busca */}
                <View style={styles.searchContainer}>
                  <TextInput
                    style={[
                      styles.searchInput,
                      {
                        borderColor: colors.inputBorder,
                        backgroundColor: colors.surface,
                        color: colors.inputText,
                      }
                    ]}
                    placeholder="Digite para buscar..."
                    placeholderTextColor={colors.inputPlaceholder}
                    value={searchText}
                    onChangeText={setSearchText}
                    autoFocus={true}
                  />
                  {searchText ? (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setSearchText("")}
                    >
                      <Text style={[styles.clearText, { color: colors.textSecondary }]}>×</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                {/* Lista de resultados */}
                <FlatList
                  data={filteredItems}
                  keyExtractor={(item) => item.value}
                  style={styles.list}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        selectedValue === item.value && styles.selectedItem,
                        selectedValue === item.value && { backgroundColor: colors.surface },
                        { borderBottomColor: colors.divider }
                      ]}
                      onPress={() => handleSelect(item.value)}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          selectedValue === item.value && styles.selectedItemText,
                          {
                            color: selectedValue === item.value ? colors.primary : colors.inputText,
                          }
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                      Nenhum resultado encontrado
                    </Text>
                  }
                />

                {/* Botão fechar */}
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: colors.surface }]}
                  onPress={handleClose}
                >
                  <Text style={[styles.closeButtonText, { color: colors.text }]}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 56,
  },
  triggerText: {
    fontSize: 16,
    flex: 1,
  },
  placeholderText: {},
  arrow: {
    fontSize: 12,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  clearButton: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  clearText: {
    fontSize: 20,
  },
  list: {
    maxHeight: 300,
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
  },
  selectedItem: {},
  itemText: {
    fontSize: 16,
  },
  selectedItemText: {
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
    padding: 20,
  },
  closeButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SearchablePicker;