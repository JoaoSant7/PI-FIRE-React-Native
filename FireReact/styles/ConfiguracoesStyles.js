import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  container: { 
    flex: 1, 
    padding: 20 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#bc010c",
    marginBottom: 30,
    textAlign: "center",
  },
  section: { 
    marginBottom: 25 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  switchText: { 
    fontSize: 16, 
    color: "#333" 
  },
});

export default styles;