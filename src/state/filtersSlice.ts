import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProduct } from "./productsSlice";

interface FiltersState {
  showFavorites: boolean;
  searchTerm: string;
  currentPage: number;
  minPrice: number;
  category: string;
  viewMode: "grid" | "list";
}

const initialState: FiltersState = {
  showFavorites: false,
  searchTerm: "",
  currentPage: 1,
  minPrice: 0,
  category: "all",
  viewMode: "grid",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
      state.currentPage = 1;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    toggleShowFavorites: (state) => {
      state.showFavorites = !state.showFavorites;
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === "grid" ? "list" : "grid";
    },
    clearFilters: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct, () => initialState);
  },
});

export const {
  toggleShowFavorites,
  setSearchTerm,
  setCurrentPage,
  setMinPrice,
  setCategory,
  toggleViewMode,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
