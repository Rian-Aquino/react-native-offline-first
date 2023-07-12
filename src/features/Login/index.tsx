import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useErrorContext } from "../../context/errorContext";
import { emailRegex } from "../../utils/emailRegex";

export const Login = () => {
  const { login } = useAuth();
  const { showError } = useErrorContext();

  const passwordInputRef = React.createRef<TextInput>();

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol12356");

  const handleSubmit = () => {
    if (!email.match(emailRegex)) return showError("Digite um e-mail válido");
    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Login</Text>
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordInputRef.current.focus()}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          value={email}
        />
        <Input
          placeholder="Senha"
          ref={passwordInputRef}
          secureTextEntry={true}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          onSubmitEditing={handleSubmit}
          value={password}
        />
        <Button title="Acessar" onPress={handleSubmit} />
      </View>
    </View>
  );
};
