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

const RegisterScreen = observer(() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await authStore.register({
        name,
        email,
        phone,
        password,
        confirmPassword,
      });
      Alert.alert("Success", "Account created successfully!");
      router.replace("/");
    } catch (err) {
      Alert.alert(
        "Registration Failed",
        err.response?.data?.message || "Something went wrong"
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
              Create Account
            </Text>
            <Text className="text-3xl font-bold text-gray-900 mb-4">
              Mega Mall
            </Text>
            <Text className="text-gray-500 text-base">
              Silahkan masukan data untuk mendaftar
            </Text>
          </View>

          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-gray-900 font-medium mb-2">
              Full Name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Masukan Nama Lengkap Anda"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900"
            />
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-gray-900 font-medium mb-2">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Masukan Alamat Email Anda"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900"
            />
          </View>

          {/* Phone Input */}
          <View className="mb-6">
            <Text className="text-gray-900 font-medium mb-2">
              Phone
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Masukan No Telepon Anda"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900"
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
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

          {/* Confirm Password Input */}
          <View className="mb-8">
            <Text className="text-gray-900 font-medium mb-2">
              Confirm Password
            </Text>
            <View className="relative">
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Konfirmasi Kata Sandi Akun"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirmPassword}
                className="bg-gray-50 rounded-xl px-4 py-4 pr-12 text-base text-gray-900"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-4"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={authStore.loading}
            activeOpacity={0.8}
            className="bg-gray-300 rounded-xl py-4 mb-6"
          >
            {authStore.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center text-gray-600 text-base font-semibold">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-gray-600 text-base">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text-blue-600 text-base font-medium">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default RegisterScreen;