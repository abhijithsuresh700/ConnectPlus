import React, { useContext } from 'react'
import "./leftBar.scss"
import Watch from '../../../Assets/watch.png'
import Friends from '../../../Assets/friends.png'
import Groups from '../../../Assets/Groups.png'
import Bag from '../../../Assets/Bag.png'
import JobRequest from '../../../Assets/JobRequest.png'
import {useNavigate} from 'react-router-dom'



function LeftBar() {
  const navigate = useNavigate();
  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user" onClick={()=>navigate('./profile')}>
            <img src="https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg"></img>
            <span>{localStorage.name}</span>
          </div> 
          <div className='item'>
          <img src={Groups}></img>

            <span>Network</span>
            </div>
            <div className='item'>
            <img src={Groups}></img>
            <span>Groups</span>
            </div>
            <div className='item'>
            <img src={Groups}></img>
            <span>Pages</span>
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