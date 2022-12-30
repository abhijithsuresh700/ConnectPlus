import { configureStore } from '@reduxjs/toolkit'
import feedPost from './postReducer'
import userReducer from './userSlice'



const store = configureStore({
  reducer: {
    post:feedPost,
    user:userReducer
  },

})

export default store