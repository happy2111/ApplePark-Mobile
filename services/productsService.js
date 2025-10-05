import axios from "axios";

class ProductsService {

  async getProducts(params = {}) {
    const apiUrl = "https://api.systematicdev.uz/integration-api/integration/api/v2/product/get-paging";

    const payload = {
      page: params.page || 1,
      limit: params.limit || 20,
      organization_id: process.env.EXPO_PUBLIC_BITO_ORGANIZATION_ID || "",
      // is_main: params.is_main ?? true,
      category_id: params.category_id || null,
      is_archived: params.is_archived ?? false,
      is_compound: params.is_compound ?? false,
      is_semi_product: params.is_semi_product ?? false,
      is_product: params.is_product ?? true,
      is_material: params.is_material ?? false,
      // updated_at: params.updated_at || "",
      is_available_for_sale: params.is_available_for_sale ?? true,
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.EXPO_PUBLIC_BITO_API_KEY || "",
        },
      });
      const res = response.data;

      if (res.code !== 0 || res.status_code !== 200) {
        throw new Error(res.message || "API returned an error");
      }

      return {
        total: res.data?.total || 0,
        items: res.data?.data || [],
        message: res.messages?.uz || "Muvaffaqiyatli",
      };
    } catch (error) {
      console.error("❌ getProducts error:", error.message);
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Mahsulotlarni olishda xatolik yuz berdi"
      );
    }
  }

}

export default new ProductsService;