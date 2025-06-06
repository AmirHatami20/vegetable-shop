import {toast} from 'react-toastify';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.js';
import {API_PATHS} from '../../utils/apiPaths.js';

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const res = await axiosInstance.get(API_PATHS.PRODUCT.GET_ALL_PRODUCT);
        return res.data;
    }
);

const storedCart = JSON.parse(localStorage.getItem('cartItem')) || [];

const initialState = {
    productList: [],
    cartItem: storedCart,
    loading: false,
    error: null,
};

const updateLocalStorage = (cartItem) => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = action.payload;
        },
        addCartItem: (state, action) => {
            const check = state.cartItem.some(
                (product) => product._id === action.payload._id
            );
            if (check) {
                toast.error('قبلاً به سبد اضافه شده');
            } else {
                const price = Number(action.payload.price);
                const newItem = {...action.payload, qty: 1, total: price};

                state.cartItem.push(newItem);
                updateLocalStorage(state.cartItem);
                toast.success('محصول با موفقیت اضافه شد');
            }
        },
        deleteCartItem: (state, action) => {
            const index = state.cartItem.findIndex(
                (product) => product._id === action.payload._id
            );
            state.cartItem.splice(index, 1);
            updateLocalStorage(state.cartItem);
            toast('یک محصول حذف شد');
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex(
                (product) => product._id === action.payload
            );
            const item = state.cartItem[index];
            item.qty += 1;
            item.total = item.qty * Number(item.price);

            updateLocalStorage(state.cartItem);
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex(
                (product) => product._id === action.payload
            );
            const item = state.cartItem[index];

            if (item.qty > 1) {
                item.qty -= 1;
                item.total = item.qty * Number(item.price);
                updateLocalStorage(state.cartItem);
            } else {
                toast.warn('حداقل تعداد 1 است');
            }
        },
        clearCart: (state) => {
            state.cartItem = [];
            updateLocalStorage([]);
            toast('سبد خرید پاک شد');
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
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
                toast.error(`خطا در دریافت محصولات: ${action?.error?.message}`);
            });
    }
});

export const {
    setDataProduct,
    addCartItem,
    deleteCartItem,
    increaseQty,
    decreaseQty,
    clearCart,
} = productSlice.actions;

export default productSlice.reducer;
