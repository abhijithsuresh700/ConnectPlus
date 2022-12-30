import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../../../Apis/ChatRequests';
import ChatBox from '../../ChatBox/ChatBox';
import Conversation from '../Conversation/Conversation';
import './chat.scss';
// import { io } from 'socket.io-client';
import { socket } from '../../../Context/socketContext';


function Chat() {
const[chats,setChats]=useState([])
const [currentChat,setCurrentChat]=useState(null)
const [onlineUsers, setOnlineUsers] = useState([]);
const [sendMessage,setSendMessage]=useState(null);
const [recieveMessage,setRecieveMessage]= useState(null)
const user = useSelector((state) => state.user)


 //const socket =useRef()



// Get the chat in chat section
useEffect(() => {
    const getChats = async () => {
      try {
         const { data } = await userChats(user._id);
         setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);


    // Connect to Socket.io
    useEffect(() => {
       // socket.current = io("ws://localhost:8800");
        socket.emit("new-user-add", user._id);
        socket.on("get-users", (users) => {
          setOnlineUsers(users);
        });
      }, [user]);


       // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      console.log("first check");
      socket.emit("send-message", sendMessage);}
  }, [sendMessage]);

    // Get the message from socket server
    useEffect(() => {
        socket.on("recieve-message", (data) => {
          setRecieveMessage(data);
        }
    
        );
      }, []);


      const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
      };



  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <p>logo search</p>
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
          Conversations
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                   data={chat}
                  currentUser={user._id}
                   online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
           setSendMessage={setSendMessage}
           receivedMessage={recieveMessage}
        />
      </div>
    </div>
  )
}

export default Chat