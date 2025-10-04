import { Text, View } from "react-native";
import "../../global.css"
import {Link, Redirect} from "expo-router";
import {authStore} from "@/store/AuthStore";
import React from "react";

export default function Index() {
  if (authStore.isAuth) return <Redirect href={"/(auth)/sign-in"} />;

  return (
    <View className="flex-1 items-center justify-center bg-orange-600">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
        <Link href={"/about"}  className="text-white">About</Link>
      </Text>
    </View>
  );
}
