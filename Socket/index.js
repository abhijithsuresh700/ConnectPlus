const io =require('socket.io')(8800,{
    cors:{
        orgin:"http://localhost:3000"
    }
})

let activeUsers =[]

io.on("connection",(socket)=>{
    //add new User
    socket.on('new-user-add',(newUserId)=>{
   // if user is not added previously
   if(!activeUsers.some((user)=>user.userId === newUserId))
   {
    activeUsers.push({
        userId:newUserId,
        socketId:socket.id
    })
   }
   console.log("connected Users",activeUsers)
   io.emit('get-users',activeUsers)
    })

    //send Message
    socket.on("send-message",(sendMessage)=>{

        const { receiverId}=sendMessage;
        const user =activeUsers.find(user=> user.userId ===  receiverId)
        if(user){
            io.to(user.socketId).emit("recieve-message",sendMessage)
        }

    })

    socket.on("disconnect",()=>{
        activeUsers =activeUsers.filter((user)=>user.socketId !==socket.id)
        console.log("User Disconnected",activeUsers);
        io.emit('get-users',activeUsers)
    })


    // SEND NOTIFICATION 
    socket.on("send-notification",(data)=>{
        console.log(data,'hii');
        const {recieverId,senderId,type} = data
        const reciever = activeUsers.find((user)=>user.userId === recieverId)
        console.log(reciever,'noti reciever'); 
        io.to(reciever?.socketId).emit("getNotification",{ 
            senderId,
            //type,
        }) 
    })


})