import React from 'react'
import "./stories.scss"

const Stories = () => {
    //temp
    const stories = [
        {
          id: 1,
          name: "John Doe",
          img: "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzdGluYXRpb258ZW58MHx8MHx8&w=1000&q=80",
        },
        {
          id: 2,
          name: "John Doe",
          img: "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzdGluYXRpb258ZW58MHx8MHx8&w=1000&q=80",
        },
        {
          id: 3,
          name: "John Doe",
          img: "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzdGluYXRpb258ZW58MHx8MHx8&w=1000&q=80",
        },
        {
          id: 4,
          name: "John Doe",
          img: "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzdGluYXRpb258ZW58MHx8MHx8&w=1000&q=80",
        },
      ];
  return (
    <div className='stories'>
    <div className='story'>
            <img src={localStorage.profilePic}></img>
            <span>{localStorage.name}</span>
            <button>+</button>

        </div>
    {stories.map(story=>(
        <div className='story' key={story.id}>
            <img src={story.img}></img>
            <span>{story.name}</span>

        </div>
    ))}
    </div>
  )
}

export default Stories