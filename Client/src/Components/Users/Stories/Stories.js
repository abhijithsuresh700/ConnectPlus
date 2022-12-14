import React from 'react'
import "./stories.scss"

const Stories = () => {
    //temp
    const stories = [
        {
          id: 1,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 2,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 3,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 4,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
      ];
  return (
    <div className='stories'>
    <div className='story'>
            <img src="https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg"></img>
            <span>{localStorage.username}</span>
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