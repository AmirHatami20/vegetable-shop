import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./Slices/userSlice.js";
import productSlideReducer from "./Slices/productSlice.js";
import categoryReducer from "./Slices/categorySlice.js";

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        product: productSlideReducer,
        category: categoryReducer,
    },
});
