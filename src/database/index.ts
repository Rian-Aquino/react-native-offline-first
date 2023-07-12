import * as SQLite from "expo-sqlite";

function openDatabase() {
  return SQLite.openDatabase("db.db");
}

export const db = openDatabase();
