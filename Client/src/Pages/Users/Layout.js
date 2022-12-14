import React, { useContext } from 'react';
import NavBar from '../../Components/Users/NavBar/NavBar';
import LeftBar from '../../Components/Users/LeftBar/LeftBar';
import RightBar from '../../Components/Users/RightBar/RightBar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../../style.scss";
import { DarkModeContext } from '../../Context/darkModeContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function Layout() {
  const navigate=useNavigate()

  const {darkMode}=useContext(DarkModeContext);
  console.log(darkMode)

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
    <div className={`theme-${darkMode? "dark":"light"}`}>
      <NavBar/>
      <div style={{display:'flex'}}>
      <LeftBar/>
      <div style={{flex:'6'}}><Outlet/></div>
      
      <RightBar/>
      </div>
    </div>
    </QueryClientProvider>
  )
}

export default Layout