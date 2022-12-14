const mongoose = require('mongoose')

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
        default:""
    }
});
const usermodel=mongoose.model('users',userschema)



const postschema = mongoose.Schema({
    post:{
        type:String,
        default:""
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
    images:{
        type:String
    },
    videos:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
});

const postmodel =mongoose.model('posts',postschema)


const commentschema = mongoose.Schema({
    comment:{
        type:String,
        default:""
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
    images:{
        type:String
    },
    videos:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
});

const commentmodel =mongoose.model('comments',commentschema)



module.exports = {usermodel,postmodel,commentmodel}