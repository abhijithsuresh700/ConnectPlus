import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./login.scss"
import axios from 'axios'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]= useState(false);
  const navigate=useNavigate()

  const validate= (email,password)=>{
    const errors={}
    const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!email){
      errors.email="email is required"
    }else if(!regexMail.test(email)){
      errors.email="Not a valid email format"
    }
    if(!password){
      errors.password="password is required"
    }
    return errors
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setFormErrors(validate(email,password))
    setIsSubmit(true); 
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
     
     const user=({
       email,password
     })
     axios.post('http://localhost:5000/login',user).then((response)=>{
       console.log(response,"qqqqqqqqqqqqqqqq")
       if(response.data.response.status){
          localStorage.setItem("token",response.data.response.token)
          localStorage.setItem('user',response.data.response.user[0].userName)
         console.log(localStorage.token,"yyyyyyyyyyyyyyyy");
         console.log(localStorage.user,"rrrrrrrrrrrrrrrrrrr")
         navigate('/')
       }else{
          const invalid='Invalid Credentials'
         setFormErrors({invalid})
         console.log("login failed");
       }
     })
    }
     }, [formErrors])

  return (
    <div className='login'>
    <div className="card">
      <div className="left">
      </div>
      <div className="right">
        <h1>Login-Admin</h1>
        <form>
          <input type='text' placeholder='Username'></input>
          <input type='password' placeholder='Password'></input>
          <button onClick={()=>navigate('/adminLayout')}>Login</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login