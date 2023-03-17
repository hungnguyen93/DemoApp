import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  containerRow: { flexDirection: "row", padding:12 },
  btn: {
    backgroundColor: "#5f9ea0",
    padding: 10,
    borderRadius: 18,
    marginRight: 10,
    
  },
  txtBtn: { fontSize: 15, fontWeight: "bold", color: "#E0E0E0" },
  txtPopup: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#84C13D",
  },
  dotButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txtInput: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    flex: 1,
    marginHorizontal: 12,
  },
  viewDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  containerItem:{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  }
});
export default styles;
