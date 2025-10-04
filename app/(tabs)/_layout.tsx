import React from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "@/store/AuthStore";
import { Redirect, Stack } from "expo-router";

const TabsLayout = observer(() => {
  if (!authStore.isAuth) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return <Stack />;
});

export default TabsLayout;
