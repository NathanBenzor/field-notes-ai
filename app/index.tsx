import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { listSessions, Session } from "../src/db/sessionsRepo";

export default function SessionsRoute() {
  const [sessions, setSessions] = useState<Session[]>([]);

  const loadSessions = useCallback(async () => {
    try {
      const data = await listSessions();
      setSessions(data);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [loadSessions]),
  );
  console.log("Sessions:", sessions);
  return (
    <View style={{ padding: 16, gap: 12, flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Sessions List</Text>
      <Button title="New Session" onPress={() => router.push("/new-session")} />
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No sessions yet.</Text>}
      />
    </View>
  );
}
