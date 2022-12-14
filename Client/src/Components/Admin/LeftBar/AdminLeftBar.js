import React from 'react';
import './adminLeftBar.scss';

function AdminLeftBar() {
  return (
    <div className='adminLeftBar'>
      <div className="container">
        <div className="menu">
          <div className="dashboard">
            <img src=""></img>
            <span>dashboard</span>
          </div> 
          <div className='item'>
          <img src=''></img>

            <span>User List</span>
            </div>
            <div className='item'>
            <img src=''></img>
            <span>Reported Users</span>
            </div>
            <div className='item'>
            <img src=''></img>
            <span>Reported Posts</span>
            </div>

            <hr/>
          
         
        </div>
      </div>

    </div>
  )
}

export default AdminLeftBar