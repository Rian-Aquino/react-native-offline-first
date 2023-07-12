import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fa7575",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    position: "absolute",
    alignSelf: "center",
    bottom: 32,
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

  closeText: {
    fontSize: 18,
    textAlignVertical: "center",
    fontWeight: "700",
    color: "#FFF",
  },

  error: {
    color: "#FFF",
  },
});
