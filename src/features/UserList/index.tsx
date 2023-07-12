import { FlatList, ActivityIndicator } from "react-native";
import { UserCard } from "./components/UserCard";
import { styles } from "./styles";
import { ListEndFooter } from "./components/ListEndFooter";
import { useUserContext } from "../../context/userContext";
import { FloatingButton } from "../../components/FloatingButton";
import { useState } from "react";

export const UserList = ({ navigation }) => {
  const { isLoading, loadUsers, userList, setUserList } = useUserContext();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setUserList((prev) => ({ ...prev, page: 0, data: [] }));
    setRefreshing(false);
  };

  return (
    <>
      <FlatList
        onRefresh={handleRefresh}
        refreshing={refreshing}
        contentContainerStyle={styles.containter}
        data={userList?.data}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item, index) => `card_${index}_${item.id}`}
        onEndReached={() => loadUsers()}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : <ListEndFooter />}
      />
      <FloatingButton title="+" onPress={() => navigation.navigate("NewUser")} />
    </>
  );
};
