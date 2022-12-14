import {createSlice, createAsyncThunk}from '@reduxjs/toolkit'
import axios from 'axios'


const getPostComments= createAsyncThunk('api/Posts',()=>{
return axios.get('http://localhost:9000/getPostComments').then((response)=>{
    console.log(response,"Commentresponseeeeeeeeeeeeeeeeeqqqqqqqqqqqqq");
    return response.data
})
})

const postComments = createSlice({
    name:"comment",
    initialState:{
        data:[]
    },
    extraReducers:{
        [getPostComments.fulfilled]:(state,action)=>{
            state.data=action.payload
        }

    }
})

export {getPostComments}
export default postComments.reducer