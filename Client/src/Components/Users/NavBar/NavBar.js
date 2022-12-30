import React, { useContext, useEffect, useState, useTransition } from 'react'
import "./navBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../Context/darkModeContext';
import { useNavigate } from 'react-router-dom'
import { Logout } from '@mui/icons-material';
import FriendRequests from '../FriendRequests/FriendRequests';
import userInstance from '../../../Axios/userAuth';
import { useSelector } from 'react-redux';
import { socket } from '../../../Context/socketContext';
import { findSearch } from '../../../Apis/ChatRequests';


function NavBar() {
  const {toggle, darkMode}=useContext(DarkModeContext);
  const navigate=useNavigate()
  const [notifiationOpen,setNotificationOpen] = useState(false);
  const [profile,setProfile]=useState()
  const [searchUser, setSearchUser] = useState([])
  const [isPending, startTransition] = useTransition()
  const userId=localStorage.id;

  const user = useSelector((state) => state.user)


  const Logout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('./register')   
  };

  const home=(e)=>{
    e.preventDefault();
    navigate('/')
  };

  useEffect(() => {
    userInstance.get('/getProfileDetails/' + userId, {
    }).then((response) => {
       setProfile(response.data)

    }).catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(()=>{
    socket.emit("new-user-add", user._id);
  })

     /* ------------------------------ SEARCH USERS ------------------------------ */


     const handleSearch = async (e) => {
      const val = e.target.value
      if (val == "") {
         setSearchUser([])
      }
      // startTransition(async () => {
         try {
            const { data } = await findSearch(val)
            // console.log(data,"search dataaaaaa");
            setSearchUser(data)
         } catch (error) {
            console.log(error)
         }
      // })
   }
  //  console.log(searchUser,"searchUserrrrrrr");



  return (
    <div className='navbar'>
    <div className='left'>
        <Link to="/" style={{textDecoration:'none'}}>
        <span>Connect<sup>+</sup></span>
        </Link>
        <HomeOutlinedIcon onClick={home}/>
        {darkMode?<WbSunnyOutlinedIcon  onClick={toggle}/>:<DarkModeOutlinedIcon onClick={toggle}/>}
        {/* <GridViewOutlinedIcon/> */}
        <div className='search'>
            <SearchOutlinedIcon/>
            <input type='text' placeholder='Search...' onChange={handleSearch}></input>
            {searchUser?.map(user=>{
          return(
            <div style={{display:"flex"}}>
              <div>
              <img className="searchedImage"
                  src={`http://localhost:9000/images/${user?.profilePic}`} style={{height:"40px",width:"40px",borderRadius:"50%"}}
                />
                <span>{user?.name}</span>
                </div>
            </div>
          )})}

        </div>

    </div>
    <div className='right'>
        <Person2OutlinedIcon onClick={()=>navigate('./connections')}/>
        <MessageOutlinedIcon onClick={()=>navigate('./chat')}/>
        <NotificationsNoneOutlinedIcon onClick={()=>navigate('./notifications')}/>
        <div className='user' onClick={Logout}>
            {/* <img src={`http://localhost:9000/images/${localStorage.profilePic}`}></img> */}
            {
              profile?.profilePic? <img src={`http://localhost:9000/images/${profile?.profilePic}`} className="profilePic"/> :
              <img src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg"  className="profilePic"/>
         }
            <span>{localStorage.name}</span>
        </div>
        
    </div>
    {/* {searchUser?.map(user=>{
          return(
            <div>
            <Link to={`/profile/${user.name}`}>
                <div className="searchedItems">
                <img className="searchedImage"
                  src={`http://localhost:9000/images/${user?.profilePic}`}
                />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-white">{user.name}</span>
                  </div>

                </div>
                </div></Link>

          </div>
          )
        })} */}
        
    </div>
  )
}

export default NavBar