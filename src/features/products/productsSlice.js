import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProducts, postProduct } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    isError: false,
    error: '',
}

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const products = fetchProducts()
    return products;
})

export const addProduct = createAsyncThunk('product/addProduct', async (data) => {
    const products = postProduct(data)
    return products;
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state, action) => {
                state.isLoading = true;
                state.postSuccess= false;
                state.isError = false
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                state.postSuccess = true;
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.postSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export default productsSlice.reducer;