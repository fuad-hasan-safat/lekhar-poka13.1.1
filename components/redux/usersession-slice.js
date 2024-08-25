import { createSlice } from "@reduxjs/toolkit";

const userSessionSlice = createSlice({
    name:'usersession',
    initialState:{
        userUuid: null,
        isLoggedIn: false,
        userName: '',
        userToken: null,
        userType: null,
        accountType: null,
    }, reducers:{
        addValidUser(state, action){
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userToken = action.payload.userToken;
            state.userUuid = action.payload.userUuid;
            state.userName = action.payload.userName;
            state.userType = action.payload.userType;
            state.accountType = action.payload.accountType;
        },
        removeUser(state, action){
            state.isLoggedIn = false;
            state.userToken = null;
            state.userUuid = null;
            state.userName = '';
            state.userType = null;
            state.accountType = null;
        }
    }
});

export const userSessionAction = userSessionSlice.actions;

export default userSessionSlice;