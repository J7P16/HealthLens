import { Text, View, StyleSheet, TextInput } from "react-native";
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
        ></TextInput>
        <TextInput 
        style={styles.input}
        placeholder="Email"
        ></TextInput>
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
  }
})