import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedPage from '../../Animated Page/AnimatedPage'
// import { AuthContext } from '../../../Context/authContext';
import "./login.scss"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import {login} from '../../../Redux-Toolkit/userSlice';



function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]= useState(false);


  const validate= (email,password)=>{
    const errors={}
    const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!email){
      errors.email="Email is required"
    }else if(!regexMail.test(email)){
      errors.email="Not a valid email format"
    }
    if(!password){
      errors.password="Password is required"
    }else if(password.length>10){
      errors.password="Password should not exceed 10 characters"
    }
    return errors
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
     setFormErrors(validate(email,password))
     setIsSubmit(true); 
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
     
     const user=({
       email,password
     })
     axios.post('http://localhost:9000/login',user).then((response)=>{
      // if(response.data.response.status==="email"){
      //   Swal.fire("Email doesn't exists")
      // }
      // if(response.data.response.status===false){
      //   Swal.fire("Password is incorrect")
      // }
       if(response.status=='201'){
          localStorage.setItem("token",response.data.userdata)
          localStorage.setItem('id',response.data.user._id)
          localStorage.setItem('name',response.data.user.name)
          localStorage.setItem('email',response.data.user.email);
          localStorage.setItem('mobileNumber',response.data.user.mobileNumber);
          localStorage.setItem('passsword',response.data.user.password);
          localStorage.setItem('profilePic',response.data.user.profilePic);
          localStorage.setItem('coverPic',response.data.user.coverPic);
          localStorage.setItem('date',response.data.user.date);
          localStorage.setItem('user',response.data.user);
          localStorage.setItem('status',response.data.user.status);
          localStorage.setItem('defaultP',"https://w7.pngwing.com/pngs/141/425/png-transparent-user-profile-computer-icons-avatar-profile-s-free-angle-rectangle-profile-cliparts-free.png");
          localStorage.setItem('defaultC',"https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-cover.jpg")
          console.log(localStorage.id,"iddddd")
          console.log(localStorage.profilePic,"profilepic");
          console.log(localStorage.defaultP,"defaultP");
          alert("nil")
          
         navigate('/')
         dispatch(login());
       }else{
          const invalid='Invalid Credentials'
         setFormErrors({invalid})
         console.log("login failed");
       }
     })
    }
     }, [formErrors])


  return (
    <AnimatedPage>
    <div className='login'>
    <div className="card">
      <div className="left">
        <h1>Connect<sup>+</sup></h1>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
        <span>Don't have an account?</span>
        <button onClick={()=>navigate('/register')}>Register</button>
      </div>
      <div className="right">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'></input>
          {formErrors? <span style={{color:"red"}}>{formErrors.email}</span> : ""}
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'></input>
          {formErrors? <span style={{color:"red"}}>{formErrors.password}</span> : ""}
          {/* <button onClick={()=>navigate('/')}>Login</button> */}
          <button>Login</button>
        </form>
      </div>
    </div>
    </div>
    </AnimatedPage>
  )
}

export default Login