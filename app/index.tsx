import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SessionsRoute() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Sessions List</Text>
      <Button title="New Session" onPress={() => router.push("/new-session")} />
    </View>
  );
}
