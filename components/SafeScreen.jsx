import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const SafeScreen = ({children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top,  flex: 1 , backgroundColor: "#fff"}}>
      {children}
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

export default SafeScreen;
