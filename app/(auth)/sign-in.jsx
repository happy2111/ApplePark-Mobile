import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { authStore } from "../../store/AuthStore";

const LoginScreen = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!login || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await authStore.login(login, password);
      Alert.alert("Success", "You have successfully logged in!");
      router.replace("/");
    } catch (err) {
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6 pt-16">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-8"
          >
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          {/* Header */}
          <View className="mb-10">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back to
            </Text>
            <Text className="text-3xl font-bold text-gray-900 mb-4">
              Mega Mall
            </Text>
            <Text className="text-gray-500 text-base">
              Silahkan masukan data untuk login
            </Text>
          </View>

          {/* Email/Phone Input */}
          <View className="mb-6">
            <Text className="text-gray-900 font-medium mb-2">
              Email/ Phone
            </Text>
            <TextInput
              value={login}
              onChangeText={setLogin}
              placeholder="Masukan Alamat Email/ No Telepon Anda"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900"
            />
          </View>

          {/* Password Input */}
          <View className="mb-8">
            <Text className="text-gray-900 font-medium mb-2">
              Password
            </Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Masukan Kata Sandi Akun"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                className="bg-gray-50 rounded-xl px-4 py-4 pr-12 text-base text-gray-900"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={authStore.loading}
            activeOpacity={0.8}
            className="bg-gray-300 rounded-xl py-4 mb-6"
          >
            {authStore.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center text-gray-600 text-base font-semibold">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text className="text-gray-900 text-base font-medium">
                Forgot Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className="text-blue-600 text-base font-medium">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default LoginScreen;