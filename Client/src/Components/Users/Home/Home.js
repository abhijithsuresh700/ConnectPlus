import React from 'react'
import Stories from "../Stories/Stories"
import Posts from "../Posts/Posts"
//import Share from "../../Users/Share/Share"
import Share from "../Share/Share"
import "./home.scss"
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  return (
    <div className='home'>
      {/* <h1>Welcome to Home Page</h1>
      <button onClick={()=>navigate('/login')}>Login</button>
      <button onClick={()=>navigate('./profile')}>Profile</button> */}
     {/* <Stories/> */}
     <Share/>
     <Posts/>
    </div>
  )
}

export default Home