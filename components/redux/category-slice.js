import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState:{
        lekharpokaCategory: [],
        audiobookCategory: [],
        selectedNavbarCategory: null,
    }, reducers:{
        addLekharPokaCategory(state, action){
            state.lekharpokaCategory = action.payload;
        }, selectNavbarCategory(state, action){
            state.selectedNavbarCategory = action.payload;
        }
    }
});

export const categoryActions = categorySlice.actions;

export default categorySlice;