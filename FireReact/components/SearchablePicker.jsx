// components/SearchablePicker.jsx - VERSÃO CORRIGIDA
import React, { useState, useMemo, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const SearchablePicker = ({
  selectedValue,
  onValueChange,
  items,
  placeholder = "Selecione uma opção",
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  // Efeito para atualizar o valor exibido quando selectedValue mudar
  useEffect(() => {
    if (selectedValue) {
      const selectedItem = items.find((item) => item.value === selectedValue);
      if (selectedItem) {
        setDisplayValue(selectedItem.label);
      } else {
        setDisplayValue("");
      }
    } else {
      setDisplayValue("");
    }
  }, [selectedValue, items]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.value.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const handleSelectItem = (item) => {
    onValueChange(item.value);
    setDisplayValue(item.label);
    setModalVisible(false);
    setSearchQuery("");
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setSearchQuery("");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  return (
    <View>
      {/* Botão que abre o modal */}
      <TouchableOpacity
        style={[styles.triggerButton, style]}
        onPress={handleOpenModal}
      >
        <Text
          style={displayValue ? styles.selectedText : styles.placeholderText}
          numberOfLines={1}
        >
          {displayValue || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Cabeçalho */}
              <View style={styles.modalHeader}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>

              {/* Lista de itens */}
              <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      item.value === selectedValue && styles.selectedItem,
                    ]}
                    onPress={() => handleSelectItem(item)}
                  >
                    <Text style={styles.itemText}>{item.label}</Text>
                    {item.value === selectedValue && (
                      <Text style={styles.selectedIndicator}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>Nenhum item encontrado</Text>
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  triggerButton: {
    height: 56,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#9e9e9e",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  closeButtonText: {
    color: "#bc010c",
    fontWeight: "600",
  },
  item: {
    padding: 15,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#e6f2ff",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectedIndicator: {
    color: "#bc010c",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
    color: "#999",
    fontSize: 16,
  },
});

export default SearchablePicker;
