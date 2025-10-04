import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {authStore} from "../../store/AuthStore";
import {Redirect, Stack} from "expo-router";

const AuthRoutesLayout = () => {
  if (authStore.isAuth) return <Redirect href={"/"} />;

  return (
    <Stack
      screenOption={{headerShown: false}}
    />
  );
};


export default AuthRoutesLayout;
