import * as SQLite from "expo-sqlite";

/**
 * Single shared DB instance (async API).
 * The DB file will live on-device and persist across app restarts.
 */

export const dbPromise = SQLite.openDatabaseAsync("fieldnotes.db");
