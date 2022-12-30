import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../Apis/ChatRequests";


const Conversation = ({ data, currentUser, online }) => {

  const [userData,setUserData] = useState({})
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
          setUserData(data)
          dispatch({type:"SAVE_USER", data:data})
      }
    
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])

  return (
    <>
      <div className="follower conversation">
        <div style={{display:"flex" }}>
          <div className="online-dot"></div>
          {
              userData[0]?.profilePic? <img src={`http://localhost:9000/images/${userData[0]?.profilePic}`} style={{width:"50px",height:"50px",borderRadius:"50px"}} className="followerImage" /> :
              <img src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg" style={{width:"10px",height:"10px"}} className="followerImage"/>
         }
          <div className="name" style={{fontSize: '1rem',marginLeft:"10px",display:"flex",flexDirection:"column"}}>
            <span>
              {userData? userData[0]?.name : "No user"}
            </span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;