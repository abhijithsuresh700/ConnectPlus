const ChatModel=require("../model/chatModel")


const createChat =async(req,res)=>{
    try{
        console.log("create chat triggered");
       const newChat =new ChatModel({
        members:[req.body.senderId,req.body.receiverId]
       })

       const data= await ChatModel.findOne({members: { $all: [req.body.senderId, req.body.receiverId] }})
    
       if(data){
            console.log("already present")
    res.json(data) 
       }
       else
       {
        console.log('new chat');
       const result =await newChat.save()
       res.status(200).json(result)
       }
  
      } catch(error){
    res.status(500).json(error)
   }
}

const userChats=async(req,res)=>{
    try{
console.log("userchat triggered");
console.log(req.params.userId,"idddddddddddd");
   const chat =await ChatModel.find({
     members:{$in:[req.params.userId]}
   })
//    13.17
console.log(chat,"after procccc");
   res.status(200).json(chat)

    } catch(error){
res.status(500).json(error)
    }
}

 const findChat= async(req,res)=>{
    try{
        console.log("findchat triggered");
    const chat =await ChatModel.findOne({
        members:{$all:[req.params.firstId,req.params.secondId]}    
    })
    res.status(200).json(chat)
    } catch(error){
        res.status(500).json(error)
    }
}
module.exports={findChat,userChats,createChat}