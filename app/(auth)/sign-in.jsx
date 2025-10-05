import React, { useEffect, useState } from "react";
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
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const valid = login.trim().length > 2 && password.trim().length >= 6;
    setIsFilled(valid);
  }, [login, password]);

  const handleSignIn = async () => {
    if (!login || !password) {
      Alert.alert("Xatolik", "Iltimos, barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      await authStore.login(login, password);
      Alert.alert("Muvaffaqiyatli", "Tizimga muvaffaqiyatli kirdingiz!");
      router.replace("/");
    } catch (err) {
      Alert.alert(
        "Kirish amalga oshmadi",
        err.response?.data?.message || "Login yoki parol noto‘g‘ri"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-16">
          <TouchableOpacity onPress={() => router.replace("/")} className="mb-8">
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-3xl font-bold text-secondary mb-2">
              Apple Park’ga
            </Text>
            <Text className="text-3xl font-bold text-secondary mb-4">
              Xush kelibsiz!
            </Text>
            <Text className="text-gray-500 text-base">
              Tizimga kirish uchun ma’lumotlaringizni kiriting
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-secondary font-medium mb-2">
              Email yoki Telefon
            </Text>
            <TextInput
              value={login}
              onChangeText={setLogin}
              placeholder="Email yoki telefon raqamingiz"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-background-muted rounded-xl px-4 py-4 text-base text-secondary border border-border"
            />
          </View>

          <View className="mb-8">
            <Text className="text-secondary font-medium mb-2">Parol</Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Parolingizni kiriting"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                className="bg-background-muted rounded-xl px-4 py-4 pr-12 text-base text-secondary border border-border"
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

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={authStore.loading || !isFilled}
            activeOpacity={0.8}
            className={`rounded-xl py-4 mb-6 ${
              isFilled ? "bg-primary" : "bg-gray-300"
            }`}
          >
            {authStore.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                className={`text-center text-base font-semibold ${
                  isFilled ? "text-white" : "text-gray-600"
                }`}
              >
                Tizimga kirish
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text className="text-secondary text-base font-medium">
                Parolni unutdingizmi?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className="text-primary text-base font-medium">
                Ro‘yxatdan o‘tish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default LoginScreen;
