const mongoose = require('mongoose')
var url = "https://www.fragrantica.com/mdimg/dizajneri/o.1983.jpg";
var proPic="defaultProfilePic.jpg";
var coverPic="defaultCoverPic.jpg";
const userschema= mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    mobileNumber:{
        type:String,
        required:[true,'number is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    date:{
        type:Date,
        default:Date.now
    },
    profilePic:{
        type:String,
        default:proPic
    },
    coverPic:{
        type:String,
        default:coverPic
    },
    status:{
        type:String,
        default:"Active"
    },
    connections:[{
        type:String,
        require:true,
        ref:"user"
    }],
    connection_Request:{
        type:Array,
        default:[]
    },
    country:{
         type:String,
    },
    dob:{
        type:Date,
    },
    reported_Posts:{
        type:Array,
        default:[]
    }
});
const usermodel=mongoose.model('users',userschema)



const postschema = mongoose.Schema({
    post:{
        type:String,
        max:500
    },
    date:{
        type:Date,
        default:new Date()
    },
    userId:{
        type:String,
        required:true,
         ref:'users'
        //eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
    },
    images:{
        type:String
    },
    videos:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    reports:{
        type:Array,
        default:[]
    },
    profilePic:{
        type:String
    },
    userName:{
        type:String,
    },
    status:{
        type:String,
        default:"Active"
    },
   
},{timestamp:true});

const postmodel =mongoose.model('posts',postschema)


const commentschema = mongoose.Schema({
    comment:{
        type:String,
        max:500
    },
    date:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:String,
        required:true,
         ref:usermodel
    },
    postId:{
        type:String,
        required:true,
    },
    images:{
        type:String
    },
    videos:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    profilePicture:{
        type:String,
        default:proPic
    },
    usersName:{
        type:String,
        
    }
},{timestamp:true});

const commentmodel =mongoose.model('comments',commentschema)

const NotificationSchema = new mongoose.Schema({

    userId:{
        type:String
    },
    Notifications:[{
       user: {
            type:String,
            ref:'users'
        },
        desc:{
            type:String,
        },
        time:{
            type:Date,
        },
        unRead:{
            type:String,
            default:'true'
        }
        }]
})

const notificationmodel = mongoose.model('notifications',NotificationSchema)



module.exports = {usermodel,postmodel,commentmodel,notificationmodel}