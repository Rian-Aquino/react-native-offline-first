import { db } from "..";
import { isEqual } from "lodash";

export class UserRepository {
  public static getTotalUsers(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `
            SELECT COUNT(*) AS total
            FROM users;
          `,
          [],
          (_, result) => {
            resolve(result.rows.item(0).total);
          }
        );
      });
    });
  }

  public static getUsers(page: number, perPage: number = 6): Promise<IUserList> {
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
            console.log(error);
            reject(error);
            return false;
          }
        );
      });
    });
  }

  /* public static incrementalUsersSync(usersFromAPI: IUser[]) {
    return new Promise<void>(async (resolve, reject) => {
      const totalUsers = await this.getTotalUsers();

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users LIMIT ?;",
          [totalUsers],
          (_, result) => {
            const existingUsers = result.rows._array;

            const usersToAdd = usersFromAPI.filter(
              (apiUser) => !existingUsers.some((localUser) => localUser.id === apiUser.id)
            );
            const usersToUpdate = usersFromAPI.filter((apiUser) =>
              existingUsers.some(
                (localUser) => localUser.id === apiUser.id && !isEqual(localUser, apiUser)
              )
            );
            const usersToDelete = existingUsers.filter(
              (localUser) => !usersFromAPI.some((apiUser) => apiUser.id === localUser.id)
            );

            usersToAdd.forEach((user) => {
              tx.executeSql(
                "INSERT INTO users (id, email, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?);",
                [user.id, user.email, user.first_name, user.last_name, user.avatar],
                () => {},
                (_, error) => {
                  reject(error);
                  return false;
                }
              );
            });

            usersToUpdate.forEach((user) => {
              tx.executeSql(
                "UPDATE users SET email = ?, first_name = ?, last_name = ?, avatar = ? WHERE id = ?;",
                [user.email, user.first_name, user.last_name, user.avatar, user.id],
                () => {},
                (_, error) => {
                  reject(error);
                  return false;
                }
              );
            });

            usersToDelete.forEach((user) => {
              tx.executeSql(
                "DELETE FROM users WHERE id = ?;",
                [user.id],
                () => {},
                (_, error) => {
                  reject(error);
                  return false;
                }
              );
            });

            resolve();
          },
          (_, err) => {
            return false;
          }
        );
      });
    });
  } */

  public static completeUsersSync(usersFromAPI: IUser[]) {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM users;");

      usersFromAPI.forEach((user) => {
        tx.executeSql(
          "INSERT INTO users (id, email, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?);",
          [user.id, user.email, user.first_name, user.last_name, user.avatar]
        );
      });
    });
  }
}
