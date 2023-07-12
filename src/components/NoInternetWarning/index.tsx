import { Text } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

export const NoInternetWarning = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Você está offline no momento! Os dados podem estar desatualizados...
      </Text>
    </SafeAreaView>
  );
};
