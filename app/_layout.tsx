import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Stack defines the screen structure for the app
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sessions" }} />
      <Stack.Screen name="new-session" options={{ title: "New Session" }} />
    </Stack>
  );
}
