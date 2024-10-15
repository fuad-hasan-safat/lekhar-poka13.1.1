import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        postTitle:'',
        postDiscripption:'',
        postImage:'',
        postLink:'',
   },
   reducers:{
    setpostData(state, action){
        state.postTitle = action.payload.title;
        state.postDiscripption = action.payload.description;
        state.postImage = action.payload.image;
        state.postLink = action.payload.link;
    }
   }
});

export const postAction = postSlice.actions;
export default postSlice;