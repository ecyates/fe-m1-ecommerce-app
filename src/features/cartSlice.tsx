// cartSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCartFromSession } from "../utilities/sessionStorageUtilities";

interface Cart {
    products: {[id:number]: number}; // id:quantity
    totalItems: number;
}

const initialState:Cart = loadCartFromSession() || {
    products:{}, 
    totalItems:0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            const {id} = action.payload;
            if (state.products[id]) {
                state.products[id] += 1;
            }else{
                state.products[id] = 1;
            }
            state.totalItems+=1;
        },
        removeItem: (state, action:PayloadAction<any>) => {
            const {id} = action.payload;
            if (state.products[id]){
                state.products[id] -= 1;
                if (state.products[id]===0){
                    delete state.products[id];
                }
                state.totalItems -= 1;
            }
        },
        checkout: (state) => {
            state.products = {};
            state.totalItems = 0;
        },
    },
});

export const { addItem, removeItem, checkout } = cartSlice.actions;

export default cartSlice.reducer;