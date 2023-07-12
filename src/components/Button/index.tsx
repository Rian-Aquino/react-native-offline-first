import { Text, Pressable, PressableProps } from "react-native";
import { styles } from "./styles";

interface IButton extends PressableProps {
  title: string;
}

export const Button = ({ title, ...props }: IButton) => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.button_text}>{title}</Text>
    </Pressable>
  );
};
