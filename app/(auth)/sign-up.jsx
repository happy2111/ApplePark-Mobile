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
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (step === 1 && !email) {
      Alert.alert("Xatolik", "Iltimos, email manzilingizni kiriting");
      return;
    }
    if (step === 2 && (!password || !confirmPassword)) {
      Alert.alert("Xatolik", "Iltimos, parol va tasdiqlash parolini kiriting");
      return;
    }
    if (step === 2 && password !== confirmPassword) {
      Alert.alert("Xatolik", "Parollar bir xil emas");
      return;
    }
    if (step === 2 && password.length < 6) {
      Alert.alert("Xatolik", "Parol kamida 6 ta belgidan iborat bo‘lishi kerak");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleSignUp = async () => {
    if (!name || !gender) {
      Alert.alert("Xatolik", "Iltimos, ism va jinsni kiriting");
      return;
    }

    try {
      await authStore.register({
        name,
        email,
        phone,
        password,
        confirmPassword,
        gender,
      });
      Alert.alert("Muvaffaqiyatli", "Hisob muvaffaqiyatli yaratildi!");
      router.replace("/");
    } catch (err) {
      Alert.alert(
        "Ro‘yxatdan o‘tishda xatolik",
        err.response?.data?.message || "Noma’lum xatolik yuz berdi"
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text className="text-2xl font-bold text-secondary mb-2">
              Email va Telefon
            </Text>
            <Text className="text-gray-500 text-base mb-6">
              Ro‘yxatdan o‘tish uchun email (majburiy) va telefon raqamingizni kiriting
            </Text>
            {/* Email */}
            <View className="mb-6">
              <Text className="text-secondary font-medium mb-2">Email *</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email manzilingizni kiriting"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-background-muted rounded-xl px-4 py-4 text-base text-secondary border border-border"
              />
            </View>
            {/* Phone */}
            <View className="mb-6">
              <Text className="text-secondary font-medium mb-2">Telefon raqam</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Telefon raqamingizni kiriting"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                className="bg-background-muted rounded-xl px-4 py-4 text-base text-secondary border border-border"
              />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-2xl font-bold text-secondary mb-2">
              Parol yaratish
            </Text>
            <Text className="text-gray-500 text-base mb-6">
              Parol va tasdiqlash parolini kiriting
            </Text>
            {/* Password */}
            <View className="mb-6">
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
            {/* Confirm Password */}
            <View className="mb-6">
              <Text className="text-secondary font-medium mb-2">
                Parolni tasdiqlang
              </Text>
              <View className="relative">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Parolni qayta kiriting"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  className="bg-background-muted rounded-xl px-4 py-4 pr-12 text-base text-secondary border border-border"
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
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-2xl font-bold text-secondary mb-2">
              Shaxsiy ma'lumotlar
            </Text>
            <Text className="text-gray-500 text-base mb-6">
              Ismingiz va jinsingizni kiriting
            </Text>
            {/* Name */}
            <View className="mb-6">
              <Text className="text-secondary font-medium mb-2">To‘liq ism</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ismingizni kiriting"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                className="bg-background-muted rounded-xl px-4 py-4 text-base text-secondary border border-border"
              />
            </View>
            {/* Gender */}
            <View className="mb-6">
              <Text className="text-secondary font-medium mb-2">Jins</Text>
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setGender("male")}
                  className={`flex-1 mr-2 py-4 rounded-xl border ${
                    gender === "male"
                      ? "bg-primary border-primary"
                      : "bg-background-muted border-border"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      gender === "male" ? "text-white" : "text-secondary"
                    }`}
                  >
                    Erkak
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender("female")}
                  className={`flex-1 ml-2 py-4 rounded-xl border ${
                    gender === "female"
                      ? "bg-primary border-primary"
                      : "bg-background-muted border-border"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      gender === "female" ? "text-white" : "text-secondary"
                    }`}
                  >
                    Ayol
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-16">
          <TouchableOpacity onPress={handleBack} className="mb-8">
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-3xl font-bold text-secondary mb-2">
              Hisob yaratish
            </Text>
            <Text className="text-3xl font-bold text-secondary mb-4">
              Apple Park
            </Text>
            <Text className="text-gray-500 text-base">
              Bosqich {step}/3
            </Text>
          </View>

          {renderStep()}

          <View className="flex-row justify-between">
            {step < 3 ? (
              <TouchableOpacity
                onPress={handleNext}
                className="bg-primary rounded-xl py-4 flex-1 shadow-button"
              >
                <Text className="text-center text-white text-base font-semibold">
                  Keyingi
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSignUp}
                disabled={authStore.loading}
                activeOpacity={0.8}
                className="bg-primary rounded-xl py-4 flex-1 shadow-button"
              >
                {authStore.loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-center text-white text-base font-semibold">
                    Ro‘yxatdan o‘tish
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row justify-center items-center mt-6 mb-8">
            <Text className="text-gray-600 text-base">
              Hisobingiz bormi?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text-primary text-base font-medium">
                Tizimga kirish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default RegisterScreen;