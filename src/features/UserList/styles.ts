import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containter: {
    padding: 16,
    gap: 16,
  },

  floatingButton: {
    position: "absolute",
    bottom: 32,
    right: 32,
    borderRadius: 100,
    width: 64,
    height: 64,
    backgroundColor: "#00f",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 5,
  },

  floatingButton_text: {
    fontSize: 64,
    color: "#FFF",
    lineHeight: 64,
    marginTop: 4,
  },
});
