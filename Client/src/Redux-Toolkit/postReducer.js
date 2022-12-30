import {createSlice, createAsyncThunk}from '@reduxjs/toolkit'
import axios from 'axios'


const getFeedPosts= createAsyncThunk('api/Posts',()=>{
return axios.get('http://localhost:9000/getFeedPosts').then((response)=>{
response.length=response.data.length
    return response.data
})
})

const feedPost = createSlice({
    name:"post",
    initialState:{
        data:[]
    },
    extraReducers:{
        [getFeedPosts.fulfilled]:(state,action)=>{
            state.data=action.payload
        }

    }
})

export {getFeedPosts}
export default feedPost.reducer