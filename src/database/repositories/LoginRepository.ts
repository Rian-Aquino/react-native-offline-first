import { db } from "..";

export class LoginRepository {
  public static save({ email, password, token }: ISession) {
    return new Promise<void>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `
        INSERT INTO login (email, password, token)
        VALUES (?, ?, ?);
      `,
          [email, password, token],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  public static getToken({ email, password }: ILoginRequest) {
    return new Promise<string | null>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `
          SELECT token
          FROM login
          WHERE email = ? AND password = ?;
        `,
          [email, password],
          (_, result) => {
            if (result.rows.length > 0) {
              const { token } = result.rows.item(0);
              resolve(token);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
}
