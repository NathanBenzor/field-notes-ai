import { dbPromise } from "./client";

export type Session = {
  id: string;
  title: string;
  createdAt: string; // ISO
};
// List all sessions in the DB, ordered by creation date descending
// this is done by querying the sessions table and mapping the results to Session objects
export async function listSessions(): Promise<Session[]> {
  const db = await dbPromise;
  const rows = await db.getAllAsync<{
    id: string;
    title: string;
    created_at: string;
  }>("SELECT id, title, created_at FROM sessions ORDER BY created_at DESC;");

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    createdAt: r.created_at,
  }));
}

// Create a new session with the given title, returning the created Session object
// this is done by inserting a new row into the sessions table
// and generating a new UUID for the session ID
export async function createSession(title: string): Promise<Session> {
  const db = await dbPromise;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const createdAt = new Date().toISOString();

  await db.runAsync(
    "INSERT INTO sessions (id, title, created_at) VALUES (?, ?, ?);",
    [id, title.trim(), createdAt],
  );

  return { id, title: title.trim(), createdAt };
}
