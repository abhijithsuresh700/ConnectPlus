import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from "timeago.js";
import { getAllNotifications } from '../../../Apis/ChatRequests';
import { socket } from '../../../Context/socketContext';
import './notifications.scss'


function Notifications({notificationData}) {
  const [content, setContent]=useState('');
  const [notifications, setNotifications] = useState([])
   const [notCount,setNotCount] = useState([])
   const userData = useSelector((state) => state.user)
   console.log(userData._id,"userdata at notifications");
   const navigate=useNavigate()
  // let {userName}=notificationData.respectedUserId



  useEffect(()=>{
    socket.on("getNotification",data =>{
       setNotCount((prev)=>[...prev,data])
    })
 },[socket])

 useEffect(() => {
    try {
       const fetchNotifications = async () => {
          const { data } = await getAllNotifications(userData._id)
          console.log(data,"notification data at front end");
          setNotifications(data)
       }
       fetchNotifications()
    } catch (error) {
      //  if (!error?.response?.data?.auth && error?.response?.status === 403) {
      //     localStorage.removeItem('userToken')
      //     localStorage.removeItem('user')
      //     navigate("/signin")
      //  }
      //  else{
          // handleError(error)
          console.log(error)
       }
    // }
 }, [socket,notCount])





  return (
    <>
    {notifications.map((notifications) => {
      return(
  //   <div className={`bg-ccLight h-12 w-full flex  items-center mb-1`}>
  //   {/* <div className='h-12 w-12 ml-5 '>
  //   <UserRoundDp image=''/>

  //   </div> */}
  
  //   <p className='ml-5'> {content} </p>
    
  //   <div className=' grow flex justify-end mr-10'>
  //   <p className='ml-5  font-thin italic text-xs'>
  //     {/* <format timeStamp={notificationData.timeStamp} />   */} time
  //     </p>
  //   {/* <CButton text={"view Post"}/>  */}
  //   </div>
        
  // </div>
  <div className='notifications'>
    <div className='username'>
    {
              notifications?.user?.profilePic? <img src={`http://localhost:9000/images/${notifications?.user?.profilePic}`} style={{width:"40px",height:"40px", borderRadius:"50px"}} className="profilePic"/> :
              <img src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg" style={{width:"10px",height:"10px"}} className="profilePic"/>
         }
      <h3>{notifications?.user?.name}</h3>
      <p>{notifications.desc}</p>

    </div>
  </div>
  ) })}
  </>
  )
}

export default Notifications