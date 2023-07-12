import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, Text, Pressable } from "react-native";
import { services } from "../../api/services";
import { UserCard } from "./components/UserCard";
import { styles } from "./styles";
import { ListEndFooter } from "./components/ListEndFooter";
import { repositories } from "../../database/repositories";
import { useNetInfo } from "@react-native-community/netinfo";
import { useUserContext } from "../../context/userContext";

export const UserList = ({ navigation }) => {
  const { isLoading, loadUsers, userList } = useUserContext();

  return (
    <>
      <FlatList
        contentContainerStyle={styles.containter}
        data={userList?.data}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item, index) => `card_${index}_${item.id}`}
        onEndReached={() => loadUsers()}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : <ListEndFooter />}
      />
      <Pressable style={styles.floatingButton} onPress={() => navigation.navigate("NewUser")}>
        <Text style={styles.floatingButton_text}>+</Text>
      </Pressable>
    </>
  );
};
