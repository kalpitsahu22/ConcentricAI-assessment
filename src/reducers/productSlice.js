import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories, fetchProducts } from "../services/api";

export const getCategories = createAsyncThunk(
  "product/getCategories",
  async () => {
    return await fetchCategories();
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ category, searchQuery }) => {
    return await fetchProducts(category, searchQuery);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    categories: [],
    products: [],
    selectedCategory: "",
    searchQuery: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
