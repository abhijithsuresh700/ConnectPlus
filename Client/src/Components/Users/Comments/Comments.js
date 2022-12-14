import { useContext, useEffect, useState } from "react";
import "./comments.scss";
// import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {getPostComments} from '../../../Redux-Toolkit/commentReducer';
import {useDispatch, useSelector} from "react-redux"


const Comments = () => {
//   const { currentUser } = useContext(AuthContext);

const [comment,setComment]=useState('');


const mutation = useMutation(
  (newComment) => {
    alert({newComment},"hello")
    return axios.post("http://localhost:9000/comments", newComment);
  },
);



const handleClick = async (e) => {
  e.preventDefault();
  setComment('');
  let Id = localStorage.id;
  alert(comment)
   mutation.mutate({ comment, userId:Id });
};


const use = useSelector((state)=>{
  console.log(state,"Commentstateeeeeee");
  // console.log(state.post.data.response,"ressssssssss");
  // return state.post.data.response
})
console.log(use,"posts");

const dispatch=useDispatch()
useEffect(()=>{
  dispatch(getPostComments())
  console.log(dispatch,"hello");
},[dispatch])



  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  //const comments=use;



  return (
    <div className="comments">
      <div className="write">
        <img src="https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg" alt="" />
        <input type="text" placeholder="write a comment" onChange={(e) => setComment(e.target.value)} value={comment} />
        <button onClick={handleClick}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;