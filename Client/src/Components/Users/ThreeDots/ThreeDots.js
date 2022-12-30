import React, { useState } from 'react'

function ThreeDots() {


    const deletePost=null;
    const obj=null;
    const userId=null;
    const [showModalPostupdation,setShowModalPostupdation]=useState('');
    const [postDrop,setPostdrop]=useState("");


  return (
    <div>
        {/* <select className='responsive-rable-dropdown'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select> */}


               {/* profile drop start */}
          <div class="flex justify-center">
              <div class="relative inline-block mb-20">

                {/* <button 
                onClick={(e) => { setPostdrop(!postDrop) }} 
                class="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none">
                  <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                  </svg>
                </button> */}
                {postDrop && <div class="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                  <hr class="border-gray-200 dark:border-gray-700 " />
                  {
                    // (obj.userId._id == userId) ?
                      <a onClick={(e) => { setShowModalPostupdation(!showModalPostupdation) }} class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        Edit
                      </a> 
                    //   : null
                  }
                  {
                    // (obj.userId._id == userId) ?
                      <a onClick={() => { deletePost(obj._id) }} class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        Delete
                      </a> 
                    //   : null
                  }
                  {
                    // (obj.userId._id != userId) ?
                      <a class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        Report
                      </a> 
                    //   : null
                  }


                </div>}
              </div>
            </div>
            {/* profile drop end */}








    </div>
  )
}

export default ThreeDots