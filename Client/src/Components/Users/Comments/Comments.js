import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "timeago.js";



const Comments = (props) => {
  const postId=props.id;
  const user = useSelector((state) => state.user)


const [comment,setComment]=useState('');


const [newComment,setNewcomment]=useState([]);
const [noOfComments,setNoOfComments]=useState('');




const handleClick = async (e) => {
  e.preventDefault();
 
  let Id = localStorage.id;
  let postId= props.id;

 const newComment = {
      userId: Id,
      postId: postId,
      comment: comment,
    }
    try {
      await axios.post('http://localhost:9000/comments', newComment)
      setComment('');
    } catch (error) {
      
    }
    axios.get('http://localhost:9000/getComment/' + postId).then((response) => {
       setNewcomment(response.data)
       setNoOfComments(response.data.length)
  
     
  
    })
   
};

useEffect(() => {
  let postId= props.id;
  axios.get('http://localhost:9000/getComment/' + postId).then((response) => {
     setNewcomment(response.data)
     setNoOfComments(response.data.length)

   

  }).catch((err) => {
    console.log(err);
  })
}, [comment])



  return (
    <div className="comments">
      <div className="write">
        <img src={`http://localhost:9000/images/${user?.profilePicture}`} alt="" />
        <input type="text" placeholder="write a comment" onChange={(e) => setComment(e.target.value)} value={comment} />
        <input type="hidden" value={comment}/>
        <button disabled={!comment} onClick={handleClick}>Send</button>
      </div>
      {newComment.map((comment) => (
        <div className="comment">
          <img src={`http://localhost:9000/images/${comment?.userId.profilePic}`} alt="" />
          <div className="info">
            <span>{comment.userId.name}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">{format(comment.date)}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;