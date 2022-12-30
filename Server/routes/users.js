var express = require('express');
var router = express.Router();
const {postSignup,doLogin,posts,getFeedPosts,likePost,comments,getComment,
  deletePost,editPost,reportPost,getConnectionSuggestions,connectionRequest,profileUpdate,getProfileDetails,
  connectionRequestList,acceptConnection,connections,getUserData,getNotifications,searchUsers,
  declineConnection}=require('../controller/usercontroller');
const multer = require('multer');



const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './public/images');
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/post/upload', upload.single('file'), (req, res) => {
  try {
    console.log(req.file,'uploaded image')
    res.json(req.file)
  } catch (error) {
    res.json(error)
  }
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signup",postSignup);
router.post('/login',doLogin);

// router.post('/post/upload');
router.post('/posts',posts);
router.get('/getFeedPosts/:userId',getFeedPosts);
router.put('/post/like/:postId/:userId', likePost);
router.post('/comments',comments);
router.get('/getComment/:id',getComment);
router.post('/deletePost/:id',deletePost);
router.post('/editPost/:id',editPost);
router.post('/reportpost/:postId/:userId',reportPost);
router.get('/getConnectionSuggestions/:id',getConnectionSuggestions);
router.post('/connectionRequest/:id',connectionRequest);
router.post('/profileUpdate',profileUpdate);
router.get('/getProfileDetails/:id',getProfileDetails);
router.get('/connectionRequestList/:id',connectionRequestList);
router.post('/acceptConnection/:accepterId/:senderId', acceptConnection);
router.get('/connections/:id',connections);
router.get('/userData/:id',getUserData);
router.get('/user/notification/:id',getNotifications);
router.get('/user/search/:id',searchUsers); //searchUsers
router.post('/declineConnection/:declinerId/:senderId',declineConnection);

//getProfileDetails




module.exports = router;
