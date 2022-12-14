import React from 'react'
import NavBar from '../../Components/Admin/NavBar/AdminNavBar';
import LeftBar from '../../Components/Admin/LeftBar/AdminLeftBar';
import { Outlet } from 'react-router-dom';


function AdminLayout() {
  return (
    <div>
    <NavBar/>
    <div style={{display:'flex'}}>
    <LeftBar/>
    <div style={{flex:'6'}}><Outlet/></div>
    
    {/* <RightBar/> */}
    </div>
  
  
  
  
  </div>
  )
}

export default AdminLayout