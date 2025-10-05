import React from "react";
import {authStore} from "../../store/AuthStore";
import {Redirect, Stack} from "expo-router";

const AuthRoutesLayout = () => {
  // Избегаем ререндер-петли: если идет загрузка/гидратация стора — не редиректим
  if (authStore.isAuth === true) return <Redirect href={"/"} />;

  return (
    <Stack
      screenOptions={{ headerShown: false }}
    />
  );
};

export default AuthRoutesLayout;