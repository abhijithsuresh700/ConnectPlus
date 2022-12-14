import React from 'react'
import "./adminNavBar.scss"

function AdminNavBar() {
  return (
    <div className='adminNavBar'>
    <div className='left'>
    <span>Connect<sup>+</sup>Admin</span>
    </div>
    <div className='right'>
      <div className='admin'>
      <img src="https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg"></img>
      <span>Admin Profile</span>
      </div>
    </div>
    
    </div>
  )
}

export default AdminNavBar