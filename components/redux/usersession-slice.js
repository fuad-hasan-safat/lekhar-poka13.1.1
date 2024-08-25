import { createSlice } from "@reduxjs/toolkit";

const userSessionSlice = createSlice({
    name:'usersession',
    initialState:{
        userUuid: null,
        isLoggedIn: false,
        userName: '',
        userToken: null,
    }, reducers:{
        addValidUser(state, action){
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userToken = action.payload.userToken;
            state.userUuid = action.payload.userUuid;
            state.userName = action.payload.userName;
        },
        removeUser(state, action){
            state.isLoggedIn = false;
            state.userToken = null;
            state.userUuid = null;
            state.userName = '';
        }
    }
});

export const userSessionAction = userSessionSlice.actions;

export default userSessionSlice;