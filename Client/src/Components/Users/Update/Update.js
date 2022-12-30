import { useEffect, useState } from "react";
// import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import userInstance from "../../../Axios/userAuth";

const Update = ({ setOpenUpdate, user }) => {
  const[userdata,setUserdata]=useState({})
  const userId=localStorage.id;

  useEffect(() => {
    userInstance.get('/getProfileDetails/' + userId, {
    }).then((response) => {
      const {email,name,city,dob}=response.data;
       setUserdata(response.data)
      //  setTtu({...response.data, city: "",
      //  dob:"",})
      setTtu({name,email,city,dob})

    }).catch((err) => {
      console.log(err);
    })
  }, [])


   const [cover, setCover] = useState(null);
   const [profile, setProfile] = useState(null);
   const navigate=useNavigate()
   const [ttu, setTtu] = useState({
      email:"",
     name: "",
     city: "",
     dob:"",
    
   });

// const {...ttu,e.target.name,e.target.value}=ttu;



  const handleChange = (e) => {
    const {name,value}=e.target;
    // let name = e.target.name
      // setTtu((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
       setTtu({...ttu,[name]:value})
  };




const handleSubmit=async()=>{

  const update = {
    userId:localStorage.id,
    userName: localStorage.name,
    email:ttu.email,
    name:ttu.name,
    city:ttu.city,
    dob:ttu.dob

  }

if(profile){
  const data = new FormData();
  const fileName = profile.name
  data.append("file", profile)
  data.append("name", fileName)
   update.profilePic=fileName;
  try {
    await axios.post('http://localhost:9000/post/upload', data)
    // .then((response)=>{
    //   console.log(response,"response after propic update")
    //   })  
  } catch (error) {
    console.log(error)
  }

}
if(cover){
  const data = new FormData();
  const fileName = cover.name
  data.append("file", cover)
  data.append("name", fileName)
   update.coverPic=fileName;
  try {
    await axios.post('http://localhost:9000/post/upload', data)
    // .then((response)=>{
    //   console.log(response,"response after coverpic update")
    //   })  
  } catch (error) {
    console.log(error)
  }

}
try {
       userInstance.post("/profileUpdate",update)
    //   .then((response)=>{
    // console.log(response,"check response after posting");
    // alert(response,"response")
      // window.location.reload()
  // })
  
} catch (error) {
  console.log(error);
  
}
}






  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile Now</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                {cover && (
              <img className="file" alt="" src={URL.createObjectURL(cover)} />
            )}
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
               onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                {profile && (
              <img className="file" alt="" src={URL.createObjectURL(profile)} />
            )}
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
               onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={ttu.email}
            name="email"
            //  onChange={(e) => setEmail(e.target.value)}
             onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={ttu.name}
            name="name"
             onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={ttu.city}
              onChange={handleChange}
          />
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={ttu.dob}
              onChange={handleChange}
          />
          <button onClick={handleSubmit}>Update</button>
        </form>
        {/* <button className="close" onClick={() => setOpenUpdate(false)}> */}
        <button className="close" onClick={()=>navigate('/profile')}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;