import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

export function Example() {
  return (
    <View style={styles.container}>
      <Text>Example Works!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
