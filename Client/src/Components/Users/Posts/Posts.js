import React, { useEffect } from 'react'
import "./posts.scss"
import Post from "../Post/Post"
import {useDispatch} from 'react-redux'
import { getFeedPosts } from "../../../Redux-Toolkit/postReducer";
import {useSelector} from "react-redux"

function Posts() {

  const databasePost = useSelector((state)=>{
    console.log(state,"stateeeeeee");
    console.log(state.post.data.response,"ressssssssss");
    return state.post.data.response
  })
  console.log(databasePost,"posts");

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getFeedPosts())
    console.log(dispatch,"hello");
  },[dispatch])

    //TEMPORARY
    // const posts = [
    //   {
    //     _id: 1,
    //     name: "Abhijith Suresh",
    //     userId: 1,
    //     profilePic:
    //       "https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg",
    //     post: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //   },
    //   {
    //     _id: 2,
    //     name: "Abhijith Suresh",
    //     userId: 2,
    //     profilePic:
    //       "https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg",
    //     post: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    //   },
    // ];



 const posts=databasePost;

 console.log(posts,"last");



  return (
    <div className='posts'>
       {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
    </div>
  )

}

export default Posts