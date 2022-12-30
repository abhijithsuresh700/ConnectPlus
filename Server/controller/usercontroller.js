const app=require("../app");
const bcrypt=require('bcrypt');
const Users = require('../model/usersModel').usermodel;
const Posts =require('../model/usersModel').postmodel;
const Comments=require('../model/usersModel').commentmodel;
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const Notifications = require("../model/usersModel").notificationmodel;

const postSignup = async (req, res) => {
    try {
        const{name,email,mobileNumber,password}=req.body
         const Password = await bcrypt.hash(password,10) 
         const user = new Users({
                  name:name,
                  email:email,
                  mobileNumber:mobileNumber,
                  password:Password
         }) 
         await user.save()
         res.status(200).json({res:user})
        
    } catch (error) {
        console.log(error.message)
        
    }
}

    const doLogin = async(req,res)=>{
        console.log(req.body,"login details");
        try {
            const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
        return res.json({ error: "User not found" })
    }
    else if (user.status == 'Blocked') {
        return res.json({ error: "Access denied temporarily" })
    }
    else {
        const auth = await bcrypt.compare(password, user.password);
        // console.log(auth, "klklk");
        if (auth) {
            console.log("entered");
            //token generation
            const usertoken = jwt.sign({ email: user.email }, "9611", { expiresIn: "7d" })
            // console.log(token);
            if (res.status(201)) {
                return res.json({ state: "ok", userdata: usertoken, user: user })
            } else {
                return res.json({ error: "error" });
            }
        }
        else {
            return res.json({ status: "error", error: "Invalid Password" })
        }
    }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const posts=async (req, res) => {
        // const newPost = new posts(req.body)
        try {
            const {post,images,userId,userName,videos,profilePicture}=req.body;
            const postukal= ({
                post,images,userId,userName,videos,profilePicture
            })

            // const savedPost = await newPost.save()
            // res.json(savedPost)

            const savedPost =  await Posts(postukal).save()
            res.json(savedPost)
            
        } catch (error) {
            console.log(error.message)
        }

    }

    const getFeedPosts=async (req, res) => {
        console.log(req.params.userId,"userId at backend");
        try {
            const allUserPost = await Posts.find({userId:req.params.userId})
            console.log(allUserPost,"all userpost at first");
            const userDetails = await Users.findById(req.params.userId)
            console.log(userDetails,"all users ");


            const allFriendsPosts=await Promise.all(userDetails.connections.map((friendId)=>{
                return ( Posts.find({userId:friendId},{reports:!req.params.userId}))
              }))
            
             console.log(allFriendsPosts,"friends postsqqqqqq");

            //  const reportedlessposts=await Posts.find({reports:friendId})



            const allposts=[...allUserPost.concat(...allFriendsPosts)]
   
            console.log("allpostsssssssss",allposts);

               res.json(allposts)
            
        } catch (error) {
            console.log(error.message)
        }

    }

      const likePost=async (req, res) => {
        try {
        const postdata = await Posts.findById(req.params.postId)
        const details ={
            user:req.params.userId,
            desc:'Liked your post',
            time:Date.now()
        }
        if (!postdata.likes.includes(req.params.userId)) {
            await postdata.updateOne({ $push: { likes: req.params.userId } })
             await Notifications.updateOne({userId:postdata.userId},{$push:{Notifications:details}},{upsert:true})
            res.json("The post has been liked")

        } else {
            await postdata.updateOne({ $pull: { likes: req.params.userId } })
            res.json("The post has been unliked")
        }
            
        } catch (error) {
            console.log(error.message)
        }

    }

      const comments=async (req, res) => {
        try {
            const newComment = new Comments(req.body)
        const savedComment = await newComment.save()
        res.json(savedComment)
        } catch (error) {
            console.log(error.message)
        }

    }

    const getComment = async (req, res) => {
        try {
            const allComment = await Comments.find({ postId: req.params.id }).populate('userId').sort({ _id: 1 });  
            res.json(allComment)
        } catch (error) {
            console.log(error);
        }
    }

      const deletePost=async (req, res) => {
        try {
            await Posts.findByIdAndDelete(req.params.id)
            res.json('deleted succesfully')
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const editPost=async (req, res) => {
        // console.log(req.params.id,"edit check");
        // try {
        //     await Posts.findByIdAndDelete(req.params.id)
        //     res.json('deleted succesfully')
            
        // } catch (error) {
        //     console.log(error.message)
        // }
    }

    const reportPost=async (req, res) => {
        console.log(req.params.postId,"report post id check");
        console.log(req.params.userId,"report user id");
        try {
            const postdata = await Posts.findById(req.params.postId)
            await postdata.updateOne({ $push: { reports: req.params.userId } })
            // await Posts.findByIdAndUpdate(req.params.id,{status: "reported"})
            // res.json('reported succesfully')
            
        } catch (error) {
            console.log(error.message)
        }
    }

        const getConnectionSuggestions=async (req, res) => {
        try {
            const currentUserId= req.params.id;
            const user = await Users.findById(req.params.id)
            const connectedList= user.connections


            // const allconnections = await Users.find({ status:'Active'}).populate('name').sort({ _id: -1 }).limit(3).skip(1); 
             const suggestionList = await Users.find({ $and: [{ _id: { $nin: [...connectedList] } }, { _id: { $nin: [currentUserId] } }] }).limit(4);
              res.json(suggestionList)
            
        } catch (error) {
            console.log(error.message)
        }

    }

      const connectionRequest=async (req, res) => {
        const sender=req.params.id;
        const reciever=req.body.userId;
        // try {
          const requests=  await Users.updateOne({ _id:reciever},{$addToSet:{connection_Request:sender}});
          console.log(requests,"total requests");
        // } catch (error) {
        //     console.log(error.message)
        // }

    }

    //declineConnection

    const profileUpdate=async(req,res)=>{
        console.log(req.body,"update check");
        const updateData = req.body;
        console.log(updateData,"updatedata");
        console.log(updateData.userId,"userid");
        console.log(updateData.userName,"name");
        console.log(updateData.profilePic,"piccc");
        console.log(updateData.dob,"dob checkkkkkk");
        try {
            if (updateData.profilePic) {
                // Users.findByIdAndUpdate(updateData.userId,{profilePic:updateData. profilePic},
                await Users.findByIdAndUpdate(updateData.userId,{profilePic:updateData.profilePic})
                res.json("data")
            }
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
            
        }
        try {
            if (updateData.coverPic) {
                // Users.findByIdAndUpdate(updateData.userId,{profilePic:updateData. profilePic},
                await Users.findByIdAndUpdate(updateData.userId,{coverPic:updateData.coverPic})
                res.json("data")
            }
        } catch (error) {
            console.log(error)
        }
        try {
            await Users.findByIdAndUpdate(updateData.userId,{country:updateData.city,dob:updateData.dob,name:updateData.name,email:updateData.email})
        } catch (error) {
            
        }
    }

    const getProfileDetails=async(req,res)=>{
        console.log(req.params.id,"id check at backend");
        try {
            const postDetails = await Users.findById(req.params.id );  
            res.json(postDetails)
        } catch (error) {
            
        }

    }
    const connectionRequestList=async(req,res)=>{
        try {
            const user = await Users.findById(req.params.id)
            // console.log(user);
            if (user) {
                const requestList = await Promise.all(user?.connection_Request?.map((id) => {
                    return Users.findOne({ _id: id }, { name: 1, profilePic: 1 })
                }))
                //    console.log(requestList,"hjhdjjjjjjjjj");
                res.status(200).json(requestList)
            }
            else {
                console.log('no user');
                res.status(402).json('please try again')
            }
    
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    const  acceptConnection=(req,res)=>{
        try {
            Users.updateOne({ _id: req.params.accepterId },
                { $addToSet: { connections: req.params.senderId } }, function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated Docs : ", docs);
                    }
                });
    
            Users.updateOne({ _id: req.params.senderId },
                { $addToSet: { connections: req.params.accepterId } }, function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated Docs : ", docs);
                    }
                });
    
            Users.updateOne({ _id: req.params.accepterId },
                { $pull: { connection_Request: req.params.senderId } }, function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated Docs : ", docs);
                    }
                });
            res.status(200).json('success')
        } catch (error) {
            console.log(error);
        }
    }

    const declineConnection=async(req,res)=>{
        try {
            console.log(req.params.declinerId,"params iddddd at decline connection");
            console.log(req.params.senderId,"senderId");
            let senderId="63abd4e023db6644dec03314";
            // const user = await Users.findById(req.params.declinerId)
            // console.log(user,"userfindddd");
          const user= await  Users.findById(req.params.declinerId)
            console.log(user,"user checkkkk11");
            if(user.connection_Request.includes(req.params.senderId)){
             const qqq=  await user.updateOne({$pull:{connection_Request:req.params.senderId}})
               console.log("checkkkk decline");
               console.log(qqq,"qqqqqqqqqqqq");
            }else{
                console.log("nothing");
            }
            
            
                // { $pull: { connection_Request: req.params.senderId } }
                // )

        } catch (error) {
            console.log(error);
        }
    }

    const connections=async(req,res)=>{
        console.log(req.params.id,"new iddd");
        const id=req.params.id;
        console.log(id,"lllll");
        try {
            // const currentUserId = req.params.id //userId

        const user = await Users.findById(id)
        const connectedList= user.connections
        console.log(connectedList,"connected listtt");

        const connections = await Promise.all(connectedList?.map((id) => {
            return Users.findOne({ _id: id }, { name: 1, profilePic: 1 })
        }))

        console.log(connections,"reqlisttttttttttttt");

        res.json(connections)
        } catch (error) {
            
        }

    }

    const getUserData = async (req, res) => {
        console.log(req.params.id,"latesttttttttttt");
        try {
            const userDetail = await Users.find({ _id: req.params.id })
            console.log(userDetail);
            res.json(userDetail)
        } catch (error) {
            console.log(error);
        }
    }


    const getNotifications = async (req, res) => {
        try {
            console.log(req.params.id,"id at get notifcation");
           const notifications = await Notifications.findOne(
              { userId: req.params.id },
              { _id: 0, Notifications: 1 }
           ).sort({_id:-1}).populate("Notifications.user", "name profilePic")
           console.log(notifications,"name check");
           const notification = notifications.Notifications.reverse()
           console.log(notification,"lastttttttt");
           res.status(200).json(notification)
        } catch (error) {
           console.log(error)
           res.status(500).json(error)
        }
     }


    const searchUsers = async (req, res) => {
        const data = req.params.id
        try {
           const users = await Users.find(
              { name: { $regex: "^" + data, $options: "i" } },
              { name: 1, profilePic: 1, accountType: 1 }
           )
           res.status(200).json(users)
           console.log(users,"usersssssssss");
        } catch (error) {
           console.log(error)
           res.status(500).json(error)
        }
     }
  


    //getUserData

    //model controller
    // const getFeedPosts=async (req, res) => {
    //     console.log(req.body,"post check");
    //     try {
            
    //     } catch (error) {
    //         console.log(error.message)
    //     }

    // }



module.exports={postSignup,doLogin,posts,getFeedPosts,likePost,comments,
    getComment,deletePost,editPost,reportPost,getConnectionSuggestions,connectionRequest,
    profileUpdate,getProfileDetails,connectionRequestList,acceptConnection,connections,getUserData,
    getNotifications,searchUsers,declineConnection }