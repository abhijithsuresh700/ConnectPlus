import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './connections.scss'

function Connections() {

  // const[suggestionList,setSuggestionList]=useState([]);
  const[connectedList,setConnectedList]=useState([]);
  useEffect(()=>{
    const userId=localStorage.id;
    axios.get('http://localhost:9000/connections/'+userId).then((response)=>{
      console.log(response.data,"jjjjjjjjjjjjjjjjjjj");
      // setSuggestionList(response.data.suggestionList)
       setConnectedList(response.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  const disconnect=(req,res)=>{

  }



  return (

    // <>
    // {connectedList?.map((connectedList) => {
    //   return(


    // <div className='connections'>
    // {
    //           connectedList?.profilePic? <img src={`http://localhost:9000/images/${connectedList?.profilePic}`} className="profilePic"/> :
    //           <img src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg" style={{width:"10px",height:"10px"}} className="profilePic"/>
    //      }
    // <h3>{connectedList?.name}</h3>
    // <button>Disconnect</button>

    // </div>
    // ) })}
    // </>
    

    <>
    {connectedList?.map((connectedList) => {
       return(
                <div className="connections">
              <div className="userName">
                {connectedList?.profilePic ? (
                  <img
                    src={`http://localhost:9000/images/${connectedList?.profilePic}`}
                    className="profilePic"
                  />
                ) : (
                  <img
                    src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg"
                    style={{ width: "10px", height: "10px" }}
                    className="profilePic"
                  />
                )}
                <h3>{connectedList?.name}</h3>
                <button
                  onClick={() => {
                    disconnect(connectedList?._id);
                  }}
                >
                  Disconnect
                </button>
              </div>
            </div>
            )})}
    </>
 
  )
}

export default Connections