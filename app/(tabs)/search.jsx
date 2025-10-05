import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SeachScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SeachScreen works!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SeachScreen;
