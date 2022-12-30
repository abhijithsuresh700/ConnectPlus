import React, { useEffect, useState } from 'react'
import "./posts.scss"
import Post from "../Post/Post"
import {useDispatch} from 'react-redux'
import { getFeedPosts } from "../../../Redux-Toolkit/postReducer";
import {useSelector} from "react-redux";
import axios from 'axios';
import userInstance from '../../../Axios/userAuth';

function Posts() {
   const user = useSelector((state) => state.user)
   const [change,setChange] =useState('')
   const [data,setData]=useState([]);

   console.log(user._id,"user id check of reducx");

  useEffect(() => {
    console.log("check likeeeeeeeee");
    userInstance.get(`/getFeedPosts/${user._id}`, {
    }).then((response) => {
       setData(response.data)

    }).catch((err) => {
      console.log(err);
    })
  }, [change])


  return (
    <div className='posts'>
       {
        data?.map(post=>{     
      return <Post post={post} setChange={setChange} key={post._id}/>}
    )}
    </div>
  )

}

export default Posts