import { createSlice } from "@reduxjs/toolkit";

const toastSlice  = createSlice({
    name:'toast',
    initialState:{
        toastMessage: null,
        isToastShow: false,
        toastType: null,
    }, reducers:{
        setSucessNotification(state, action){
            state.toastMessage = action.payload;
            state.isToastShow = true;
            state.toastType = 'done';
        },
        setWarnedNotification(state, action){
            state.toastMessage = action.payload;
            state.isToastShow = true;
            state.toastType = 'failed';
        },
        closeNotification(state){
            state.toastMessage = null;
            state.isToastShow = false;
            state.toastType = null;
        }
    }
})

export const toastAction = toastSlice.actions;

export default toastSlice;