import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPost = createAsyncThunk('post/getPost', async ({ id }) => {
  return fetch(`http://localhost:3001/posts/${id}`).then((res) => res.json())
})
export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  return fetch(`http://localhost:3001/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
})

export const createPost = createAsyncThunk(
  'post/createPost',
  async (values) => {
    return fetch(`http://localhost:3001/posts/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
      }),
    }).then((res) => res.json())
  },
)

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ id, title, body }) => {
    console.log('id', id)
    return fetch(`http://localhost:3001/posts/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => res.json())
  },
)

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: [],
    loading: false,
    error: null,
    body: '',
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit
      state.body = action.payload.body
    },
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.loading = true
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false
      console.log(action)
      state.post = [action.payload]
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [deletePost.pending]: (state, action) => {
      state.loading = true
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false
      console.log(action)
      state.post = action.payload
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [createPost.pending]: (state, action) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.post = [action.payload]
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [updatePost.pending]: (state, action) => {
      state.loading = true
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false
      state.post = [action.payload]
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const { setEdit } = postSlice.actions
export default postSlice.reducer
