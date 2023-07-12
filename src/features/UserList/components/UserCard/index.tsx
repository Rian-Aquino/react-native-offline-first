import { Text, View, Image, ImageSourcePropType, ImageURISource } from "react-native";
import { styles } from "./styles";

interface IUserCard {
  user: IUser;
}

export const UserCard: React.FC<IUserCard> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: user.avatar || "https://clipart-library.com/images/ATbrxjpyc.jpg" }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {user.first_name} {user.last_name}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
};
