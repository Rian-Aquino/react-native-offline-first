import { Text, View } from "react-native";
import { styles } from "./styles";

export const ListEndFooter = () => {
  return (
    <View style={styles.containter}>
      <Text>Você alcançou o final da lista de usuários</Text>
    </View>
  );
};
