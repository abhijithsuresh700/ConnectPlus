import { configureStore } from '@reduxjs/toolkit'
import feedPost from './postReducer'


console.log(feedPost,"feedpostttttttttttt");
const store = configureStore({
  reducer: {
    post:feedPost
  },
})

export default store