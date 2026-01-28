import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { migrate } from "../src/db/migrate";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Run migrations on app startup
  // and block rendering until complete
  // (or error occurs)
  // This ensures the DB schema is up-to-date before any screens try to use it
  useEffect(() => {
    // this useEffect runs once on mount
    (async () => {
      try {
        // the try block attempts to run migrations, migrations are async
        await migrate();
        setReady(true);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  if (!ready) {
    // if not ready, show loading or error
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{err ? `DB Error: ${err}` : "Loading…"}</Text>
      </View>
    );
  }

  return (
    // if ready, render the app stack
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sessions" }} />
      <Stack.Screen name="new-session" options={{ title: "New Session" }} />
    </Stack>
  );
}
