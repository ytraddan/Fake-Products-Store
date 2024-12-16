import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const {
  setShowFavorites,
  setSearchTerm,
  setCurrentPage,
  setMinPrice,
  setCategory,
  setViewMode,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
