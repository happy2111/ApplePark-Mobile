import { makeAutoObservable, runInAction } from "mobx";
import ProductsService from "../services/productsService";

class ProductStore {
  products = [];
  total = 0;
  loading = false;
  error = null;
  page = 1;
  limit = 20;
  category_id = null;

  constructor() {
    makeAutoObservable(this);
  }

  // 🔄 Получить список продуктов
  async fetchProducts(params = {}) {
    this.loading = true;
    this.error = null;

    try {
      const res = await ProductsService.getProducts({
        page: params.page || this.page,
        limit: params.limit || this.limit,
        category_id: params.category_id || this.category_id,
      });

      runInAction(() => {
        this.products = res.items;
        this.total = res.total;
        this.page = params.page || this.page;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
      });
      console.error("❌ ProductStore.fetchProducts error:", err.message);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  // ➕ Добавить мок данные (например, для оффлайн-режима)
  setMockData() {
    this.products = [
      { id: 1, name: "Orange Juice", price: 12000 },
      { id: 2, name: "Apple iPhone 15", price: 14500000 },
      { id: 3, name: "Mega Coffee", price: 18000 },
    ];
    this.total = this.products.length;
  }

  // 🔎 Найти по названию
  search(query) {
    const lower = query.toLowerCase();
    return this.products.filter((p) => p.name.toLowerCase().includes(lower));
  }

  // 🧹 Очистить состояние
  clear() {
    this.products = [];
    this.total = 0;
    this.page = 1;
    this.error = null;
  }
}

export const productStore = new ProductStore();
