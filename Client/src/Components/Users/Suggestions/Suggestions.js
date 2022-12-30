import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


function Suggestions({users}) {
    const navigate=useNavigate();
    const userId=localStorage.id;
    const [connect,setConnect]=useState();
    const [isConnected,setIsConnected]=useState(false);
    // console.log(users.connection_Request,"user check at suggestion");

    const Connect=()=>{
        navigate('./profile')
      }


      const connectionHandler = (id) => {
        try {
         const req=  axios.post('http://localhost:9000/connectionRequest/'+ userId,{userId:id});
        } catch (err) {
          console.log(err);
        }
        setConnect(isConnected ? connect - 1 : connect + 1);
         setIsConnected(!isConnected);
        //  console.log(connect,"connect");
        //  console.log(isConnected,"is connected");
      };
      // console.log(connect,"connect");
      //    console.log(isConnected,"is connected");

         useEffect(()=>{
           setIsConnected(users.connection_Request.includes(userId))
         })



  return (
    <div>
        <div className="user">
            <div className="userInfo" onClick={()=>Connect(users._id)}>
              {users.profilePic? <img src={`http://localhost:9000/images/${users?.profilePic}`}/>:<img src={`http://localhost:9000/images/defaultProfilePic.jpg`} style={{width:"10px",height:"10px"}}></img>}
              <span>{users.name}</span>
            </div>
            <div className="buttons">
              <button onClick={()=>connectionHandler(users._id)} >{isConnected==true? "Connecting..." : "connect" }</button>
            </div>
          </div>          
    </div>
  )
}

export default Suggestions