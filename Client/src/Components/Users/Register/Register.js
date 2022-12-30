import React, { useEffect, useState } from 'react'
import "./register.scss"
import { useNavigate } from 'react-router-dom'
import AnimatedPage from '../../Animated Page/AnimatedPage';
import axios from 'axios';
import Swal from 'sweetalert2';


function Register() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [mobileNumber,setMobileNumber]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]=useState();
  const navigate=useNavigate();
 

  const validate=(name,email,mobileNumber,password)=>{
    const errors={}
    const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!name){
      console.log(errors.name)
      errors.name= 'Name is required';
       }
    if(!email){
      errors.email="Email is required"

    }else if(!regexMail.test(email)){
      errors.email="Not a valid email format"
    }
    if(!mobileNumber){
      errors.mobileNumber="Number required"
    }else if(mobileNumber.length!==10){
      errors.mobileNumber="Mobile Number must be a 10 digit"
    }
    if(!password){
      errors.password="Password required"
    }
    else if(password.length<4){
      errors.password="Password must be more than 4 characters"
    }else if(password.length>10){
      errors.password="Password should not exceed 10 characters"
    }
    return errors

  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
     
     const user=({
       name,email,mobileNumber,password
     })
     axios.post('http://localhost:9000/signup',user).then((response)=>{
      // console.log(response.status,"new controller response");
      // console.log(response.data.response.status,"response")
      if(response){
      //   Swal.fire("Email already exists")
      // }
      //  else{
        console.log("success");
         Swal.fire({
           position: 'top-end',
           icon: 'success',
           title: 'Account has been created',
           showConfirmButton: false,
           timer: 3500
         })
         navigate('/login')
        
   
       }
   
     })
    }
     }, [formErrors])



     const handleSubmit=(e)=>{
      e.preventDefault();
       setFormErrors(validate(name,email,mobileNumber,password))
         setIsSubmit(true);
    }


  return (
    <AnimatedPage>
    <div className='register'>
    <div className="card">
      <div className="left">

         <h1>Register</h1>
        <form onSubmit={handleSubmit}>
         <div>
          <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'></input>
          {formErrors? <span style={{color:"red"}}>{formErrors.name}</span> : ""}
          </div>
          <div>
          <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'></input>
          {formErrors? <span style={{color:"red"}}>{formErrors.email}</span> : ""}
          </div>
          <div>
          <input type='number' value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} placeholder='Mobile Number'></input>
          {formErrors? <span style={{color:"red"}}>{formErrors.mobileNumber}</span> : ""}
          </div>
          <div>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'></input>
          {formErrors? <span style={{color:"red"}}>{formErrors.password}</span> : ""}
          </div>
          {/* <div>
          <input type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password'></input>
          {formErrors? <span style={{color:"red"}}>{formErrors.password}</span> : ""}
          </div> */}
          <button className='transition'>Register</button>
        </form>



      </div>
      <div className="right">

          <h1>Connect<sup>+</sup></h1>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
        <span>Already have an account?</span>
        <button onClick={()=>navigate('/login')}>Login</button>

      </div>
    </div>
    </div>
    </AnimatedPage>
  )
}

export default Register