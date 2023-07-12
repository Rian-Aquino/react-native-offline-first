import { Text, Pressable, PressableProps } from "react-native";
import { styles } from "./styles";

interface IFloatingButton extends PressableProps {
  title: string;
}

export const FloatingButton = ({ title, ...props }: IFloatingButton) => {
  return (
    <Pressable style={styles.floatingButton} {...props}>
      <Text style={styles.floatingButton_text}>{title}</Text>
    </Pressable>
  );
};
