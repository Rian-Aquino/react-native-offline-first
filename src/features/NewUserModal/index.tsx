import { Button, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useUserContext } from "../../context/userContext";

export const NewUserModal = ({ navigation }) => {
  const { createUser } = useUserContext();

  const [name, setName] = useState("Rian");
  const [lastName, setLastName] = useState("Aquino");
  const [email, setEmail] = useState("rian.aquino@gmail.com");

  const lastNameInputRef = React.createRef<TextInput>();
  const emailInputRef = React.createRef<TextInput>();

  const handleSubmit = async () => {
    await createUser({ first_name: name, last_name: lastName, avatar: null, email });
    navigation.navigate("Users");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Cadastro de Usuário</Text>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChange={(e) => setName(e.nativeEvent.text)}
          value={name}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => lastNameInputRef.current.focus()}
        />
        <TextInput
          placeholder="Sobrenome"
          style={styles.input}
          onChange={(e) => setLastName(e.nativeEvent.text)}
          value={lastName}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => emailInputRef.current.focus()}
          ref={lastNameInputRef}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={handleSubmit}
          ref={emailInputRef}
        />
        <Button title="Cadastrar" onPress={handleSubmit} />
      </View>
    </View>
  );
};
