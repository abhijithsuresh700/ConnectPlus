import "./share.scss";
import Image from "../../../Assets/img.png";
import Map from "../../../Assets/map.png";
import Friend from "../../../Assets/friend.png";
import { useContext, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
const Share = () => {
   const [file, setFile] = useState(null);
   const [post, setPost] = useState("");
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
    //   const res = await makeRequest.post("/upload", formData);
    const res = await axios.post('http://localhost:9000/upload',formData)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


   const  currentUser  = localStorage.username;
   const  profilePic = localStorage.profilePic;

  //  const queryClient = useQueryClient();

   const mutation = useMutation(
    (newPost) => {
      alert({newPost},"hello")
      return axios.post("http://localhost:9000/posts", newPost);
    },
    {
      // onSuccess: () => {
      //   // Invalidate and refetch
      //   queryClient.invalidateQueries(["posts"]);
      // },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    let Id = localStorage.id;
    console.log(Id,"iddddddqqqq");
    if (file) imgUrl = await upload();
    mutation.mutate({ post, img: imgUrl, userId:Id });
    setPost("");
    setFile(null);
    alert(post)
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {/* <img src={"/upload/" + currentUser.profilePic} alt="" /> */}
            <img src={"/upload/"} alt="" />
            <input
              type="text"
               placeholder={`What's on your mind ${currentUser}?`}
              onChange={(e) => setPost(e.target.value)}
              value={post}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;