import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/api/axios";
import {Alert} from "react-native"; // твой axios instance

class AuthStore {
  user: any = null;
  token: string | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return !!this.token && !!this.user;
  }

  async init() {
    try {
      const [user, token] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("token"),
      ]);

      runInAction(() => {
        this.user = user ? JSON.parse(user) : null;
        this.token = token || null;
      });
    } catch (e) {
      console.error("Ошибка при инициализации AuthStore:", e);
    }
  }

  // 🟢 Регистрация
  async register(payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role?: string;
    gender?: string;
    isStore?: boolean;
  }) {
    this.loading = true;
    try {
      const { data } = await api.post("/auth/register", {...payload, isStore: true});

      runInAction(() => {
        this.user = data.user;
        this.token = data.token;
        this.loading = false;
      });

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      return data.user;
    } catch (err: any) {
      runInAction(() => (this.loading = false));
      console.error("Ошибка при регистрации:", err.response?.data || err.message);
      throw err;
    }
  }

  // 🟡 Логин
  async login(login: string, password: string) {
    this.loading = true;
    try {
      const { data } = await api.post("/auth/login", { login, password });
      console.log(data + "data")
      runInAction(() => {
        this.user = data.user;
        this.token = data.token;
        this.loading = false;
      });

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      return data.user;
    } catch (err: any) {
      runInAction(() => (this.loading = false));
      console.error("Ошибка при входе:", err.response?.data || err.message);
      throw err;
    }
  }

  // 🔄 Проверка refresh (по cookie)
  async refresh() {
    try {
      const { data } = await api.get("/auth/refresh");
      runInAction(() => {
        this.token = data.token;
      });
      await AsyncStorage.setItem("token", data.token);
    } catch (err) {
      Alert.alert("Error", err?.message<unknown> );
      console.error("Ошибка обновления токена:", err);
      this.logout();
    }
  }

  // 🔴 Выход
  async logout() {
    await AsyncStorage.multiRemove(["user", "token"]);
    runInAction(() => {
      this.user = null;
      this.token = null;
    });
  }
}

export const authStore = new AuthStore();
