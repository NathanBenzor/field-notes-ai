import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { createSession as createSessionRepo } from "../src/db/sessionsRepo";

// NewSessionRoute is the component for the "New Session" screen
export default function NewSessionRoute() {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const createSession = async () => {
    const t = title.trim();
    if (!t) return;
    setSaving(true);
    try {
      await createSessionRepo(t);
      setTitle("");
      router.back();
    } catch (e) {
      console.error("Failed to create session", e);
    } finally {
      setSaving(false);
    }
  };

  const disabled = saving || title.trim() === "";

  return (
    <View style={{ padding: 16 }}>
      <Text>New Session</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Session Title"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginTop: 16,
        }}
      />
      <Pressable
        onPress={createSession}
        disabled={disabled}
        style={({ pressed }) => [
          {
            marginTop: 16,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 6,
            alignItems: "center",
            backgroundColor: disabled ? "#ddd" : "#007AFF",
            opacity: pressed && !disabled ? 0.9 : 1,
          },
        ]}
      >
        <Text style={{ color: disabled ? "#666" : "#fff", fontWeight: "600" }}>
          {saving ? "Saving…" : "Create Session"}
        </Text>
      </Pressable>
    </View>
  );
}
