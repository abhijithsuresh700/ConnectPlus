import React, { useEffect, useState } from 'react';
import "./rightBar.scss";
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Suggestions from '../Suggestions/Suggestions';

function RightBar() {
  const [connections,setConnections]=useState([]);
  const [connectionRequest,setConnectioRequest]=useState([]);
  const navigate=useNavigate();
  const userId=localStorage.id;
  

  useEffect(() => {
    axios.get('http://localhost:9000/getConnectionSuggestions/'+ userId, {
    }).then((response) => {
        setConnections(response.data)
    }).catch((err) => {
      console.log(err);
    })
  },[]);


  const Connect=()=>{
    navigate('./profile')
  }

  return (
    <div className='rightBar'>
      <div className='container'>
        <div className='item'>
          <span>Suggestions For You</span>
          {connections.map((users)=>{
            return(
          <Suggestions users={users} key={users._id} />
          //post={post} key={post._id}
          // <div className="user">
          //   <div className="userInfo" onClick={Connect}>
          //     <img src={users.profilePic}></img>
          //     <span>{users.name}</span>
          //   </div>
          //   <div className="buttons">
          //     <span><button >connect</button></span>
          //     <button>dismiss</button>
              
          //   </div>
          // </div>
           ) })} 
        </div>
      </div>
      </div>
  )
}

export default RightBar