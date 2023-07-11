import * as SQLite from "expo-sqlite";

function openDatabase() {
  return SQLite.openDatabase("db.db");
}

export const db = openDatabase();

/* export const insertUser = (user: Omit<IUser, "id">) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      INSERT INTO users (email, first_name, last_name, avatar)
      VALUES (?, ?, ?, ?);
      `,
      [user.email, user.first_name, user.last_name, user.avatar],
      (_, result) => {
        console.log("Usuário inserido com sucesso!");
      },
      (_, error) => {
        console.error("Erro ao inserir o usuário:", error);
        return true;
      }
    );
  });
};

export const getAllUsers = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      SELECT * FROM users;
      `,
      [],
      (_, result) => {
        const { rows } = result;
        console.log("Usuários encontrados:", rows._array);
      },
      (_, error) => {
        console.error("Erro ao obter os usuários:", error);
        return true;
      }
    );
  });
}; */
