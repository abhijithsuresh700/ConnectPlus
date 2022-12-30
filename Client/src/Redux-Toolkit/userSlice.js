import { createSlice } from '@reduxjs/toolkit'
// const defaultUser = (localStorage.getItem('user'))
// const defaultUser=localStorage.user;
// console.log(defaultUser,"defaultuser");

const _id=localStorage.id;
const name=localStorage.name;
const email=localStorage.email;
const profilePicture=localStorage.profilePic;
const status=localStorage.status;
const coverPicture=localStorage.coverPic;
const connections=localStorage.connections;
const connection_Request=localStorage.connection_Request;

// if(defaultUser){
//      var { name, email, profilePicture,status,coverPicture,connections,connection_Request} = defaultUser
   
// }else{

// }
// _id,name, email, profilePicture,status,coverPicture,connections

const userSlice = createSlice({
    name:'user',
    initialState:{
        _id,
        name,
        email,
        status,
        profilePicture,
        coverPicture,
        connections,
        connection_Request,
        
    },
    reducers:{
        login:(state,action)=>{
            state._id = action.
            state.name = action.payload.name
            state.email = action.payload.email
            state.profilePicture = action.payload.profilePicture
            state.coverPicture = action.payload.coverPicture
            state.connections = action.payload.connections
            state.status = action.payload.status
            state.connection_Request = action.payload.connection_Request
        }, 
        logout:(state) => {state ={} }
    },
});


export const {login, logout} = userSlice.actions;
export default userSlice.reducer;