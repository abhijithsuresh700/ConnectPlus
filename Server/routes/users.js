var express = require('express');
var router = express.Router();
const userHelpers= require('../helpers/userHelpers');
const adminHelpers= require('../helpers/adminHelpers');
const User=require('../model/usersModel').usermodel
const bcrypt=require('bcrypt');
const { response } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async(req,res)=>{  
  try{
    const{name,email,mobileNumber,password}=req.body
     const Password = await bcrypt.hash(password,10)   
    const user = new User({
      name:name,
      email:email,
      mobileNumber:mobileNumber,
      password:Password
  })
    userHelpers.doSignup(user).then((response)=>{
       res.json({response})          
     })
    } catch(error){
      console.log(error);
    }
});

router.post('/login', async(req,res)=>{
  try{    
    userHelpers.doLogin(req.body).then((response)=>{
       res.json({response})          
     })
    } catch(error){
      console.log(error);
    }
});

router.post('/upload', async(req,res)=>{
  console.log(req.body,"check1");
  // try{    
  //   userHelpers.doLogin(req.body).then((response)=>{
  //      res.json({response})          
  //    })
  //   } catch(error){
  //     console.log(error);
  //   }
});

router.post('/posts', async(req,res)=>{
  try{    
    userHelpers.posts(req.body).then((response)=>{
       res.json({response})          
     })
    } catch(error){
      console.log(error);
    }
});

router.get('/getFeedPosts',async(req,res)=>{
  try{
    userHelpers.getFeedPosts().then((response)=>{
      res.json({response})
    })
  }catch(error){
    console.log(error)
  }
});

router.post('/comments', async(req,res)=>{
  try{    
    userHelpers.comments(req.body).then((response)=>{
       res.json({response})          
     })
    } catch(error){
      console.log(error);
    }
});



router.get('/getPostComments',async(req,res)=>{
  try{
    userHelpers.getPostComments().then((response)=>{
      console.log(response,"commentssspppppppppppp");
      res.json({response})
    })
  }catch(error){
    console.log(error)
  }
});

//getPostComments




module.exports = router;
