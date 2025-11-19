import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import React from 'react';
export default function Index() {
  return (
    <View style={styles.overallContainer}>
      <Text style={styles.header}>HealthLens</Text>
      <Text style={styles.signIn}>Sign In</Text>
      <View style={styles.loginBox}>

        <TextInput 
        style={styles.input}
        placeholder="Email"
        autoComplete="email"
        ></TextInput>

        <TextInput 
        style={styles.input}
        placeholder="Password"
        autoComplete="new-password"
        ></TextInput>

        <Button
        title="Sign in"
        ></Button>
      </View>

      <View style={styles.footer}>
        <Button
        title="Forgot password?"
        ></Button>

        <Button
        title="No account? Create one!"
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 30,
  },

  loginBox: {
    padding: 10,
    width: '65%',
    flex: 0.1
  },

  signIn: {
    fontSize: 25,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
  }
})