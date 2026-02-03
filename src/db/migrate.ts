import { dbPromise } from "./client";

// Perform DB migrations to ensure the schema is up-to-date
// This function checks the current schema version and applies
// necessary migrations in sequence to bring the DB to the latest version
export async function migrate() {
  const db = await dbPromise; // Get the shared DB instance

  // Good default for performance + reliability on mobile
  await db.execAsync("PRAGMA journal_mode = WAL;");

  // Read current schema version from SQLite
  const row = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version;",
  );
  const version = row?.user_version ?? 0;

  // v1 schema
  if (version < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);

    // Bump schema version
    await db.execAsync("PRAGMA user_version = 1;");
  }
}
