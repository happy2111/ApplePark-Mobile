import React from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "@/store/AuthStore";
import {Redirect, Stack, Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const TabsLayout = observer(() => {


  return <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#FF7A00",
      tabBarStyle: {
        borderRadius: "",
        // backgroundColor: "",
        borderTopWidth: 1,
        height: 80,
        paddingBottom: 8,
        paddingTop: 8,
        paddingHorizontal: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="search"
      options={{
        title: "Search",
        tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        headerShown: false
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: `${authStore.isAuth ? "Profile" : "Login"}`,
        tabBarIcon: ({ color, size }) => <Ionicons name={authStore.isAuth ? "person-circle-outline" : "log-in-outline"} size={size} color={color} />,
        headerShown: false
      }}
    />
  </Tabs>;
});

export default TabsLayout;
