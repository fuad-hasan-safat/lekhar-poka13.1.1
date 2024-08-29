import { createSlice } from "@reduxjs/toolkit";

const userPostSlice = createSlice({
    name: 'userpost',
    initialState: {
        isUserPostAdded: false,
        unapprovedItems: [],
        approvedItems: [],
        createdPostAt: null,
    }, reducers: {
        addApiPostsToUnapproved(state, action) {
            console.log('payload - ',action.payload);
            state.isUserPostAdded = true;
            state.unapprovedItems = action.payload;
        },
        addApiPostsToApproved(state, action) {
            state.isUserPostAdded = true;
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
        }, removePost(state){
            state.approvedItems = [];
            state.unapprovedItems = [];
            state.createdPostAt = null;
            state.isUserPostAdded = false;
        }
    }
});

export const userPostAction = userPostSlice.actions;

export default userPostSlice;