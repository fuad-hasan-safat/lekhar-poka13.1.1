import { createSlice } from "@reduxjs/toolkit";

const userPostSlice = createSlice({
    name: 'userpost',
    initialState: {
        userUuid: null,
        unapprovedItems: [],
        approvedItems: []
    }, reducers: {
        addApiPostsToUnapproved(state, actioon) {

        },
        addApiPostsToApproved(state, action) {

        },
        addSinglePostToUnapproved(state, action) {

        },
        addSinglePostToApproved(state, action) {

        },
    }
})

export const userPostAction = userPostSlice.actions;

export default userPostSlice;