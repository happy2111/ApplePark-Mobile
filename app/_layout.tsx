import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import {authStore} from "../store/AuthStore";
import "../global.css";
import SafeScreen from "@/components/SafeScreen";

export default function RootLayout() {

  useEffect(() => {
    authStore.init(); // загрузить user/token при запуске
  }, []);


  return (
    <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar backgroundColor="transparent" translucent={true} style="dark" />
    </SafeScreen>
  );
}
