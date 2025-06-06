import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.js';
import {API_PATHS} from '../../utils/apiPaths.js';

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async () => {
        const res = await axiosInstance.get(API_PATHS.CATEGORY.GET_ALL_CATEGORY);
        return res.data;
    }
);

const initialState = {
    categoryList: [],
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryList: (state, action) => {
            state.categoryList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categoryList = action.payload;
        });
    },
});

export const {
    setCategoryList
} = categorySlice.actions;

export default categorySlice.reducer;
