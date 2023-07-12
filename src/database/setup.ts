import { db } from "./index";

export async function createTables() {
  await new Promise<void>(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          avatar TEXT
        );
      `
      );

      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS login (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          token TEXT NOT NULL
        );
      `
      );
    });
  });
}
