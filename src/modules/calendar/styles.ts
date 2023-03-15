import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  containerRow: { flexDirection: "row", paddingLeft: 12, marginTop: 15 },
  btn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 18,
    marginRight: 10,
  },
  txtBtn: { fontSize: 15, fontWeight: "bold", color: "#E0E0E0" },
  txtPopup: { fontSize: 18, fontWeight: "bold", color: "#84C13D" },
  tcb_Choose: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  tcb_Choose_border: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 15,
    borderWidth: 2,
  },
});
export default styles;