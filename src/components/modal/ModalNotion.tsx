import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ModalCustom } from "./Modal";
import { Text } from "react-native";

type Props = {
  isVisible: boolean;
  title: string;
  children: React.ReactNode;
  // description: string;
  animationType?: "none" | "slide" | "fade" | undefined;
  onPressCancel: () => void;
  onPressOk: () => void;
};

const ModalNotion = ({
  isVisible,
  title,
  children,
  animationType,
  onPressCancel,
  onPressOk,
}: Props) => {
  return (
    <ModalCustom
      animationType={animationType}
      transparent
      isVisible={isVisible}
    >
      <View style={styles.container_modal}>
        <View style={styles.empty_view} onTouchEnd={onPressCancel} />
        <View style={styles.body_modal}>
          <Text style={styles.modal_title}>{title}</Text>
          {children}
          <View style={styles.modal_bottom_container}>
            <TouchableOpacity
              onPress={onPressCancel}
              style={styles.modal_bottom_buttonLeft}
            >
              <Text style={styles.modal_bottom_textButtonRight}>
                {"Cancel"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressOk}
              style={styles.modal_bottom_buttonRight}
            >
              <Text style={styles.modal_bottom_textButtonRight}>{"Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalCustom>
  );
};

export default ModalNotion;

const styles = StyleSheet.create({
  empty_view: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container_modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  body_modal: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 20,
    borderRadius: 20,
  },
  modal_title: {
    fontSize: 26,
    textAlign: "center",
    lineHeight: 35,
  },

  modal_bottom_container: {
    flexDirection: "row",
    marginHorizontal: -24,
    marginTop: 12,
  },
  modal_bottom_buttonLeft: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 15,
  },
  modal_bottom_buttonRight: {
    flex: 1,
    backgroundColor: "#84C13D",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 15,
  },
  modal_bottom_textButtonLeft: {
    fontSize: 26,
    color: "#333333",
    lineHeight: 38,
  },
  modal_bottom_textButtonRight: {
    fontSize: 26,
    color: "white",
    lineHeight: 38,
  },
  modal_description: {
    textAlign: "center",
    color: "#666",
    fontSize: 21,
    lineHeight: 32,
    marginVertical: 30,
  },
});
