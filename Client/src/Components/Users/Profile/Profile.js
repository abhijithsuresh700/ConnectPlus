import React, { useEffect, useState } from 'react'
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
import userInstance from '../../../Axios/userAuth';
import { useParams } from 'react-router';

function Profile() {
  const navigate=useNavigate()
  const [profile,setProfile]=useState()
  const userId=localStorage.id;
  const abc=useParams().id;
  console.log(abc,"abc check");

  useEffect(() => {
    userInstance.get('/getProfileDetails/' + abc, {
    }).then((response) => {
       setProfile(response.data)

    }).catch((err) => {
      console.log(err);
    })
  }, [])


  const [openUpdate, setOpenUpdate] = useState(false);
  return (
    <div className='profile'>
      <div className="images">
        {/* <img
          src={`http://localhost:9000/images/${profile?.coverPic?profile.coverPic:localStorage.defaultP}`}
          alt=""
          className="cover"
        />        */}
        {
              profile?.coverPic? <img src={`http://localhost:9000/images/${profile?.coverPic}`} className="cover" /> :
              <img src={`http://localhost:9000/images/defaultCoverPic.jpg`} className="cover"/>
         }
         {
              profile?.profilePic? <img src={`http://localhost:9000/images/${profile?.profilePic}`} className="profilePic"/> :
              <img src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg" style={{width:"10px",height:"10px"}} className="profilePic"/>
         }

        
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="leftt">
            {/* <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a> */}
            {/* <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a> */}
            <span>Birthday:{profile?.dob}</span>
          </div>
          <div className="center">
            <h2>{profile?.name}</h2>
            <button onClick={()=>navigate('/update')}>Update</button>
            {/* <button onClick={() => setOpenUpdate(true)}>Update</button>  */}
            <div className="center-div"><h5>{profile?.email}</h5> 
            <h5>Country:{profile?.country}</h5> </div>
                   
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
            {/* <TwitterIcon fontSize="large" /> */}
          </div>
        </div>
      <Posts/>
      </div>
    </div>
  )
}

export default Profile
