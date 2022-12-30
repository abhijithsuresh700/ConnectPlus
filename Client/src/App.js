import './App.css';
import {Routes , Route, useLocation} from 'react-router-dom';
import Layout from './Pages/Users/Layout';
import Profile from './Pages/Users/Profile';
import Register from './Pages/Users/Register';
import Login from './Pages/Users/Login';
import AdminLogin from './Pages/Admin/Login';
import AdminLayout from './Pages/Admin/AdminLayout';
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom'
import Home from './Components/Users/Home/Home';
import FriendRequests from './Components/Users/FriendRequests/FriendRequests';
import Connections from './Components/Users/Connections/Connections';
import Notifications from './Components/Users/Notifications/Notifications';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from './Context/darkModeContext';
import { AnimatePresence } from "framer-motion";
import Update from "./Components/Users/Update/Update";
import {Provider} from 'react-redux';
import Store from './Redux-Toolkit/Store';
import Chat from './Pages/Users/Chat';


function App() {
  const location = useLocation();

  const {darkMode}=useContext(DarkModeContext);


  return (
    <div>
      <Provider store={Store}>
      <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route>
        
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/home' element={<Home/>}/> */}
          <Route path='/profile' element={<Profile/>} />
          <Route path='/update' element={<Update/>}></Route>
          <Route path='/friendRequets' element={<FriendRequests/>}></Route>
          <Route path='/connections' element={<Connections/>}></Route>
          <Route path='/notifications' element={<Notifications/>}></Route>
        <Route path='/profile/:id' element={<Profile/>}></Route>
          </Route>
        <Route path='/admin' element={<AdminLogin/>}></Route>
        <Route path='/adminLayout' element={<AdminLayout/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
        
        </Route>
      </Routes>
      </AnimatePresence>
      </Provider>
    </div>
  );
}

export default App;
