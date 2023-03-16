import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  containerRow: { flexDirection: "row", paddingLeft: 12, marginTop: 15 },
  btn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 18,
    marginRight: 10,
    alignSelf: "center",
  },
  btnCreate: {
    backgroundColor: "#E0E0E0",
    borderColor: "black",
    paddingHorizontal: 20,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 2,
    alignSelf: "center",
  },
  txtBtnCreate: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },

  txtBtn: { fontSize: 15, fontWeight: "bold", color: "#E0E0E0" },
  txtPopup: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 12,
  },
  txtDateTime: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 12,
  },
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
    borderWidth: 3,
  },
  txtInput: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    flex: 1,
    marginHorizontal: 12,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
});
export default styles;
