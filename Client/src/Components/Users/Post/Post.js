import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../Comments/Comments";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
 import moment from 'moment';
 import axioss from '../../../Axios/axios';
import userInstance from "../../../Axios/userAuth";
import { deletePost } from "../../../Apis/PostRequests";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Post = ({ post ,setChange}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment,setComment]=useState('');
  const navigate=useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState('');
  const [dotOpen,setDotOpen]=useState(false);

  // const [user,setUser]=useState('');
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useSelector((state) => state.user)

const userId=user._id
// console.log(userId,"userId of posting like");
// console.log(post._id,"postId of liked post");

const dropDown=(e)=>{
  e.preventDefault();
  setDotOpen(!dotOpen);
}

const handleSubmit=(e)=>{
  e.preventDefault();
  setCommentOpen(!commentOpen); 
}
// console.log(post.likes,"post checkk");

useEffect(()=>{
  setIsLiked(post.likes.includes(userId))

},[post._id,userId])


  //TEMPORARY
  //const liked = false;

  //notification

  useEffect(() => {
    setSocket(io("http://localhost:8800"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);




  const likeHandler = () => {console.log(isLiked,"is liked at first");
    try {
      axios.put(`http://localhost:9000/post/like/${post._id}/${userId}`);
    } catch (err) {
      console.log(err);
    }
      setLike(isLiked ? like - 1 : like + 1);
     setIsLiked(!isLiked);
     setChange(Date.now())
     console.log(like,"like");
     console.log(isLiked,"is liked");
    //  window.location.reload() 
     socket.emit('send-notification',{
       senderId:userId,
       recieverId:post.userId,
       type:'liked your post'
      
   })
  };
  


  const handleDelete=()=>{
    try {
      //  axios.post('http://localhost:9000/deletePost/'+post._id)
      //  userInstance.post('/deletePost/'+post._id)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
      }).then((result) => {
        if (result.isConfirmed) {        
          const {data}=deletePost(post._id);
          window.location.reload()    
        }
      })
      
           
   } catch (err) {
     console.log(err);
   }
  }





  const handleEdit=()=>{
    try {
      axios.post('http://localhost:9000/editPost/'+post._id)
        //  window.location.reload()   
   } catch (err) {
     console.log(err);
   }
  }

  const handleReport=()=>{
    try {
      axios.post(`http://localhost:9000/reportPost/${post._id}/${userId}`)
        //  window.location.reload()   
   } catch (err) {
     console.log(err);
   }
  }
  
console.log(post.userName,"username check at profile check");
console.log(post.userId._id,"id of user of post check");
console.log(user.name,"user check");
console.log(user._id,"id of current user");


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
          {/* {post?.profilePicture==localStorage.defaultP? <img src={localStorage.profilePic}/>:<img src={`http://localhost:9000/images/${post.profilePicture}`}/>} */}
          {
              post?.userId?.profilePic? <img src={`http://localhost:9000/images/${post?.userId.profilePic}`} className="profilePic"/> :
              <img src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg" style={{width:"40px",height:"40px"}} className="profilePic"/>
         }
          {/* <img src={post.profilePicture}/> */}
            <div className="details">
              <Link to={post.userName===user.name? `/profile/${user._id}` : `/profile/${post.userId._id}`}>
                <span className="name">{post.userName}</span>
                </Link>
              {/* <Link to={userData.userName === user.userName?'/myprofile':`/profile/${user.userName}`}></Link> */}
              <span className="date">{format(post.date)}</span>
            </div>
          </div>

          <div class="dropdown">
  <span><MoreHorizIcon /></span>
  <div class="dropdown-content">
  {/* <a onClick={handleEdit}>edit</a><br/> */}
  <a onClick={handleDelete}>delete</a><br/>
  <a onClick={handleReport}>report</a>
  </div>
</div>



        </div>
        <div className="content">
          <p>{post.post}</p>
          {post.images?
          <img src={"http://localhost:9000/images/"+post.images} alt="" /> : ""}
          {post.videos?
          <video controls
          src={"http://localhost:9000/images/"+post.videos}type="video/mp4"
          /> : ""}
        </div>
        <div className="info">
          <div className="item" onClick={likeHandler}>
            {isLiked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
             {like}
             Likes
          </div>
          {/* <div className="item" onClick={() => setCommentOpen(!commentOpen) && commentss}> */}
          <div className="item" onClick={handleSubmit}>
            <TextsmsOutlinedIcon />
             Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments id={post._id} comment={comment}/>}
      </div>
    </div>
  );
};

export default Post;