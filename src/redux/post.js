// src/store/postsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../components/axiosInstance";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/post/list",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSinglePost = (postId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/post/${postId}`);
    dispatch(setSelectedPost(res.data));
  } catch (error) {
    console.error(error);
  }
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    selectedPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
