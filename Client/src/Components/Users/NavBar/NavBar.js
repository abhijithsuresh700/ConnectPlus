import React, { useContext } from 'react'
import "./navBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../Context/darkModeContext';
import { useNavigate } from 'react-router-dom'


function NavBar() {
  const {toggle, darkMode}=useContext(DarkModeContext);
  const navigate=useNavigate()

  return (
    <div className='navbar'>
    <div className='left'>
        <Link to="/" style={{textDecoration:'none'}}>
        <span>Connect<sup>+</sup></span>
        </Link>
        <HomeOutlinedIcon/>
        {/* {darkMode?<WbSunnyOutlinedIcon  onClick={toggle}/>:<DarkModeOutlinedIcon onClick={toggle}/>} */}
        {/* <GridViewOutlinedIcon/> */}
        <div className='search'>
            <SearchOutlinedIcon/>
            <input type='text' placeholder='Search...'></input>

        </div>
    </div>
    <div className='right'>
        <Person2OutlinedIcon/>
        {/* <EmailOutlinedIcon/> */}
        <NotificationsNoneOutlinedIcon/>
        <div className='user' onClick={()=>navigate('./register')}>
            <img src="https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg"></img>
            <span>{localStorage.name}</span>
        </div>
    </div>
    </div>
  )
}

export default NavBar