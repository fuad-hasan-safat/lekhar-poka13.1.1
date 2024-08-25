import { createSlice } from "@reduxjs/toolkit";

const userPostSlice = createSlice({
    name: 'userpost',
    initialState: {
        unapprovedItems: [],
        approvedItems: [],
        createdPostAt: null,
    }, reducers: {
        addApiPostsToUnapproved(state, action) {
            console.log('payload - ',action.payload)
            state.unapprovedItems = action.payload;
        },
        addApiPostsToApproved(state, action) {
            state.approvedItems = action.payload;
        },
        addSinglePostToUnapproved(state, action) {

        },
        addSinglePostToApproved(state, action) {

        },
        deleteApost(state, action){
            state.approvedItems = state.approvedItems.filter(post => post._id !== action.payload);
            state.unapprovedItems = state.unapprovedItems.filter(post => post._id !== action.payload);
        }, postCreatedAt(state, action){
            state.createdPostAt = action.payload;
        }
    }
});

export const userPostAction = userPostSlice.actions;

export default userPostSlice;