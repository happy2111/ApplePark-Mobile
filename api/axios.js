import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "android") {
    // Для Android эмулятора localhost = 10.0.2.2
    return "http://10.0.2.2:5000/api";
  }

  if (Platform.OS === "ios") {
    // iOS симулятор понимает localhost
    return "http://localhost:5000/api";
  }

  // Для реальных устройств — твой локальный IP
  return "http://192.168.1.148:5000/api";
};

const api = axios.create({
  baseURL: "http://172.20.10.3:5000/api",
  withCredentials: true, // 🔑 важно! чтобы refreshToken по куки ходил
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Добавляем accessToken в каждый запрос
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🟡 Перехватываем 401 и обновляем accessToken по refreshToken (из cookie)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // запросим новый accessToken по refreshToken (кука автоматически отправляется)
        const { data } = await api.get("/auth/refresh");

        // сохраним новый токен
        await AsyncStorage.setItem("token", data.token);

        // подставим в заголовок и повторим запрос
        originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
