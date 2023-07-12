import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 5,
  },

  image: {
    width: 80,
    aspectRatio: "1/1.3",
    borderRadius: 10,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "500",
  },
});
