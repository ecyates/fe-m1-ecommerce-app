// productsSlice.tsx
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok){
            throw new Error('Failed to fetch products.')
        }
        const products = await response.json();
        return products;
    }
);

const productsSlice = createSlice({
    name:'products',
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state)=>{
                state.status='loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action:PayloadAction<Product[]>)=>{
                state.status='succeeded';
                state.items = action.payload.map((product: any) => ({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.image,

                }));
            })
            .addCase(fetchProducts.rejected, (state, action:PayloadAction<any>)=>{
                state.status='failed';
                state.error=action.payload?.message || 'An error occurred';
            })
    }
});

export default productsSlice.reducer;