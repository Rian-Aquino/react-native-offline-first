import { db } from "..";
import { isEqual } from "lodash";

export class UserRepository {
  public static list(page: number, perPage: number = 6): Promise<IUserList> {
    return new Promise<IUserList>((resolve, reject) => {
      db.transaction((tx) => {
        const offset = (page - 1) * perPage;

        tx.executeSql(
          `
        SELECT COUNT(*) AS total
        FROM users;
      `,
          [],
          (_, countResult) => {
            const total = countResult.rows.item(0).total;

            tx.executeSql(
              `
            SELECT id, email, first_name, last_name, avatar
            FROM users
            LIMIT ? OFFSET ?;
          `,
              [perPage, offset],
              (_, result) => {
                resolve({
                  page,
                  per_page: perPage,
                  total,
                  total_pages: Math.ceil(total / perPage),
                  data: result.rows._array,
                });
              },
              (_, error) => {
                reject(error);
                return false;
              }
            );
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  public static save(user: IUserPostRequest & { id?: number }) {
    return new Promise<IUser>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO users (id, email, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?);",
          [user.id, user.email, user.first_name, user.last_name, user.avatar],
          () => {
            resolve({ id: user.id || null, ...user });
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  public static sync(usersFromAPI: IUser[]) {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM users;");

      usersFromAPI.forEach((user) => {
        tx.executeSql(
          "INSERT INTO users (id, email, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?);",
          [user.id, user.email, user.first_name, user.last_name, user.avatar],
          () => {},
          () => false
        );
      });
    });
  }
}
