import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  selectionHeader: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2196f3",
    flexDirection: "column",
  },
  selectionText: {
    fontSize: 14,
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 8,
  },
  selectionActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectionButton: {
    padding: 4,
  },
  selectAllText: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelSelectionText: {
    color: "#f44336",
    fontWeight: "bold",
    fontSize: 14,
  },
  placeholderSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  contador: {
    fontSize: 14,
    color: "#bc010c",
    fontWeight: "600",
    marginTop: 8,
  },
  exportHint: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 8,
    textAlign: "center",
  },
  filtroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filtroInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  limparFiltro: {
    padding: 4,
  },
  dashboardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bc010c",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dashboardButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  ocorrenciaCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    position: "relative",
  },
  selectedOccurrenceCard: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
    borderWidth: 2,
  },
  // AJUSTE: Indicador de seleção mais para a esquerda
  selectionIndicator: {
    position: "absolute",
    top: 10,
    left: 10, // Alterado de right para left
    zIndex: 1,
  },
  ocorrenciaContent: {
    flex: 1,
    marginLeft: 8, // Adicionado espaço para o indicador
  },
  ocorrenciaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  ocorrenciaTipoContainer: {
    flex: 1,
    marginRight: 10,
  },
  ocorrenciaTipo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  prioridadeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  prioridadeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  ocorrenciaDescricao: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 18,
  },
  ocorrenciaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ocorrenciaLocal: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
    flex: 1,
  },
  ocorrenciaHora: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  ocorrenciaDetalhes: {
    fontSize: 13,
    color: "#888",
    marginLeft: 6,
    fontStyle: "italic",
    flex: 1,
  },
  ocorrenciaData: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
  },
  semResultados: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  semResultadosText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  novaOcorrenciaButton: {
    backgroundColor: "#bc010c",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  novaOcorrenciaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  modalInfo: {
    fontSize: 12,
    color: "#888",
    marginBottom: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  csvButton: {
    backgroundColor: "#4CAF50",
  },
  pdfButton: {
    backgroundColor: "#f44336",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  cancelButton: {
    padding: 12,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export default styles;