import { Button, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

export const Login = () => {
  const { login } = useAuth();
  const passwordInputRef = React.createRef<TextInput>();

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol12356");

  const handleSubmit = () => {
    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordInputRef.current.focus()}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          value={email}
        />
        <TextInput
          style={styles.input}
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
