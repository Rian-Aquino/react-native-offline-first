import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import React from "react";

export const Input = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  return <TextInput style={styles.input} {...props} ref={ref} />;
});
