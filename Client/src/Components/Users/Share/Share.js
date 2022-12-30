import "./share.scss";
import Image from "../../../Assets/img.png";
import Map from "../../../Assets/map.png";
import Friend from "../../../Assets/friend.png";
import { useContext, useState } from "react";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { PostAddTwoTone } from "@mui/icons-material";
const Share = () => {
   const [image, setImage] = useState(null);
   const [video, setVideo] = useState(null);
   const [post, setPost] = useState("");




   const  currentUser  = localStorage.username;
   const  profilePic = localStorage.profilePic;


  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    let Id = localStorage.id;
    let userName= localStorage.name;


    const newPost = {
      userId:localStorage.id,
      post: post,
      imgUrl : "",
      userName: localStorage.name,
      profilePicture:localStorage.profilePic
    }
    console.log(newPost,"new post");

    if(image){
      //  imgUrl = await upload();
      console.log(image,"image check");
      const data = new FormData();
      const fileName = image.name
      console.log(fileName,"file name");
      data.append("file", image)
      data.append("name", fileName)
       newPost.images=fileName;
      try {
        console.log(data,"data before uploading");
        alert("data before uploading")
        await axios.post('http://localhost:9000/post/upload', data).then((response)=>{
          })
        
      } catch (error) {
        console.log(error)
      }

    }
    if (video) {
      console.log(video,"video check");
      const data = new FormData();
      const fileName = video.name
      data.append("file", video)
      data.append("name", fileName)
       newPost.videos = fileName
      try {
        await axios.post('http://localhost:9000/post/upload', data).then((response)=>{
        })
      } catch (error) {
        console.log(error);
      }
    } 
    try {
      console.log(newPost,"newpost");
      alert("new post")
           return axios.post("http://localhost:9000/posts", newPost).then((response)=>{
        setPost("");
          window.location.reload()
      })
      
    } catch (error) {
      
    }
  }












  return (
    <div className="share">
      <div className="container">
      {/* <form onClick={handleClick} action=""> */}
        <div className="top">
          <div className="left">
            {/* <img src={"/upload/" + currentUser.profilePic} alt="" /> */}
            {localStorage.profilePic==localStorage.defaultP? <img src={localStorage.profilePic}/> : <img src={`http://localhost:9000/images/${localStorage.profilePic}`}/>} 
            <input
              type="text"
               placeholder={`What's on your mind ${localStorage.name}?`}
              onChange={(e) => setPost(e.target.value)}
              value={post}
              required
            />
          </div>
          <div className="right">
            {image && (
              <img className="file" alt="" src={URL.createObjectURL(image)} />
            )}
            {video && (
              <video className="file" src={URL.createObjectURL(video)}/>
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
          <label htmlFor="imagefile">
            <input
              type="file"
              id="imagefile"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />          
              <div className="item">
                <img src={Image} alt="" />
                {/* <AddPhotoAlternateOutlinedIcon/> */}
                <span>Add Image</span>
              </div>
            </label>
            <label htmlFor="videofile">
            <input
              type="file"
              id="videofile"
              accept= "video/*"
              style={{ display: "none" }}
              onChange={(e) => setVideo(e.target.files[0])}
            />          
            <div className="item">
              <img src={video} alt="" />
              <span>Add Video</span>
            </div>
            </label>
            {/* <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div> */}
          </div>
          <div className="right">
            <button disabled={!post} type="submit" onClick={handleClick} >Post</button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Share;