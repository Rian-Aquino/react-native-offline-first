import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserList } from "../features/UserList";
import { NewUserModal } from "../features/NewUserModal";
import { UserContextProvider } from "../context/userContext";

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Users">
          <Stack.Screen name="Users" component={UserList} options={{ title: "Usuários" }} />
          <Stack.Screen
            name="NewUser"
            component={NewUserModal}
            options={{ presentation: "modal", title: "Cadastrar Usuário" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};
