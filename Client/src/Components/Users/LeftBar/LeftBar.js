import React, { useContext, useEffect, useState } from 'react'
import "./leftBar.scss"
import {Link, useNavigate} from 'react-router-dom'
import userInstance from '../../../Axios/userAuth'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';



function LeftBar() {
  const navigate = useNavigate();
  const [profile,setProfile]=useState()
  const userId=localStorage.id;

  const Logoutt = async (e) => {
    e.preventDefault();
    navigate('./register')
    localStorage.clear();
  };

  useEffect(() => {
    userInstance.get('/getProfileDetails/' + userId, {
    }).then((response) => {
       setProfile(response.data)

    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user" onClick={()=>navigate('./profile')}>
          {
              profile?.profilePic? <img src={`http://localhost:9000/images/${profile?.profilePic}`} className="profilePic"/> :
              <img src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg" style={{width:"10px",height:"10px"}} className="profilePic"/>
         }
            <span>{localStorage.name}</span>
          </div> 
          <div className='item' onClick={()=>navigate('./connections')}>
            <PeopleOutlinedIcon/>
            <span>Connections</span>
            </div>
          <div className='item' onClick={()=>navigate('./friendRequets')}>
          <PersonAddOutlinedIcon/>
            <span>Connect Requests</span>
            </div>
            <div className='item' onClick={()=>navigate('./notifications')}>
            <NotificationsNoneOutlinedIcon/>
            <span>Notifications</span>
            </div>
            <div className='item' onClick={()=>navigate('./chat')}>
            <ForumOutlinedIcon/>
            <span>Chat</span>
            </div>
            <div className='item' onClick={Logoutt}>
            <ExitToAppOutlinedIcon/>
            <span>Logout</span>
            </div>

            <hr/>

            <div className='menu'>

            </div>
          
         
        </div>
      </div>
    </div>
  )
}

export default LeftBar