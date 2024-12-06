import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { api } from "@/services/api";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  favorites: number[];
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  favorites: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await api.getProducts();
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id">) => {
    const id = Date.now();
    return {
      ...product,
      id,
      rating: { rate: 0, count: 0 },
    };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index === -1) {
        state.favorites.push(id);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;
