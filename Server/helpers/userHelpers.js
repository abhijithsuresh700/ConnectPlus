const db=require('../config/database');
const bcrypt=require('bcrypt');
const Users = require('../model/usersModel').usermodel;
const Posts =require('../model/usersModel').postmodel;
const Comments = require('../model/usersModel').commentmodel;
const jwt = require('jsonwebtoken');
const { response } = require('express');



module.exports={
    doSignup:(user)=>{
        return new Promise(async(resolve,reject)=>{
            const {email,password}=user
            const emailVerify= await Users.find({email:email}) 
            if(emailVerify.length>=1){
                resolve({status:false})
            }else{
            user.save().then((response)=>{
                resolve(response)
            })
        }
        })
    },

    doLogin:(user)=>{
        return new Promise (async(resolve,reject)=>{
            const {email,password}=user
            const emailVerify= await Users.find({email:email})    
            console.log(emailVerify,"emailverify");
            if(emailVerify.length<1){
                response.status="email";
                resolve(response)
            }
            else if(emailVerify){               
                const passwordVerify = await bcrypt.compare(password,emailVerify[0].password)
                if(passwordVerify){
                    const id= emailVerify._id 
                    const token = jwt.sign({id},"9611",{expiresIn:"10"})                    
                    resolve({token:token,status:true,user:emailVerify})
                }else{
                    resolve({status:false})
                }
            }
        })
    },

    posts:(posts)=>{
        // console.log(posts,"posts cjeck");
        const {post,img,userId,userName}=posts;
        const postukal= ({
            post,img,userId,userName
        })
        // console.log(postukal,"postukal");
        return new Promise(async(resolve,reject)=>{
            await Posts(postukal).save().then((response)=>{
                // console.log(response,"check");
            resolve(response)
        })

         })
    },

    getFeedPosts:()=>{
        return new Promise((resolve,reject)=>{
            Posts.find({}).then((response)=>{
                resolve(response)
            })
        })

    },

    comments:(comments)=>{
        console.log(comments,"comments");
        const {comment,userId,postId}=comments;
        const commentukal= ({
            comment,userId,postId
        })
        return new Promise(async(resolve,reject)=>{
            await Comments(commentukal).save().then((response)=>{
            resolve(response)
        })

         })
    },

    getPostComments:()=>{
        return new Promise((resolve,reject)=>{
            Comments.find({}).then((response)=>{
                resolve(response)
            })
        })

    },

}