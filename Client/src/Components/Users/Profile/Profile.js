import React from 'react'
import "./profile.scss"
import { useNavigate } from 'react-router-dom'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../Posts/Posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Update from "../Update/Update";

function Profile() {
  const navigate=useNavigate()
  return (
    <div className='profile'>
      {/* <h1>Welcome to Profile Page</h1>
      <button onClick={()=>navigate('/')}>Home</button> */}
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          {/* <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div> */}
          <div className="center">
            <span>{localStorage.username}</span>
            <button onClick={()=>navigate('/update')}>Update</button>
          </div>
          {/* <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div> */}
        </div>
      <Posts/>
      </div>
    </div>
  )
}

export default Profile