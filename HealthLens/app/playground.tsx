import React from "react";
import { Button, View } from "react-native";
import { useAuth } from "../src/hooks/authHooks";

export default function BackendTest() {
  // Pass an empty string or a valid redirect path if needed
  const { signOutHook, loading } = useAuth("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Sign Out" onPress={signOutHook} disabled={loading} />
    </View>
  );
}
