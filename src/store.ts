import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';
import { saveCartToSession } from "./utilities/sessionStorageUtilities";

export const store = configureStore({
    reducer:{
        cart: cartReducer, 
        products: productsReducer,
    }, 
});

store.subscribe(() => {
    const state = store.getState();
    saveCartToSession(state.cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
