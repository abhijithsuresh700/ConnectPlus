import React from 'react'
import "./rightBar.scss"

function RightBar() {
  return (
    <div className='rightBar'>
      <div className='container'>
        <div className='item'>
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://www.juventus.com/images/image/private/t_portrait_mobile/dev/t5mex3dyn30xi3ox6ii5.jpg"></img>
              <span>Johns Jose</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScPaF540chdPfHnqnOm7aBrBLVBCjF-2F3iw&usqp=CAU"></img>
              <span>Salim M</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1171x193:1173x191)/origin-imgresizer.eurosport.com/2021/11/29/3263164-66780548-2560-1440.jpg"></img>
              <span>Aleena Raj</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default RightBar