import React, {useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {observer} from "mobx-react-lite";
import {authStore} from "../../store/AuthStore";
import {router} from "expo-router";

const ProfileScreen = observer(() => {
  useEffect(() => {
    if (!authStore.isAuth) {
      router.replace("/(auth)/sign-in");
    }
  } , [])

  return (
    <View style={styles.container}>
      <Text>ProfileScreen works!</Text>
      <Text>User: {authStore.user?.name}</Text>
      <TouchableOpacity
        onPress={async () => {
          await authStore.logout();
          router.replace("/(auth)/sign-in");
        }}
      >
        <Text>Выйти</Text>
      </TouchableOpacity>

    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
