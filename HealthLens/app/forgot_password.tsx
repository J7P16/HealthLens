import { Text, View, StyleSheet, TextInput, Button, } from "react-native";
import { Link } from 'expo-router';
import React from 'react';
export default function ForgotPassword() {
  return (
    <View style={styles.overallContainer}>
      <View style={styles.centerContent}>
        <Text style={styles.header}>HealthLens</Text>
        <Text style={styles.signIn}>Password Reset</Text>
        <View style={styles.loginBox}>

          <TextInput 
          style={styles.input}
          placeholder="Email"
          autoComplete="email"
          ></TextInput>

          <TextInput 
          style={styles.input}
          placeholder="Current Password"
          autoComplete="current-password"
          ></TextInput>

          <TextInput 
          style={styles.input}
          placeholder="New Password"
          autoComplete="new-password"
          ></TextInput>

          <Button
          title="Send Email"
          ></Button>
        </View>
      </View>

      <View style={styles.footer}>
        <Link href={'/create_account'} style={styles.help}>No account? Create one!</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
  },

  centerContent: {
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
    paddingBottom: 50,
  },

  help: {
    fontSize: 15,
    padding: 10,
    fontWeight: "bold",
  }
})