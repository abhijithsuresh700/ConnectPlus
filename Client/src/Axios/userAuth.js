import axios from "axios";

const baseURL='http://localhost:9000/'
const defaultOptions={
    baseURL:baseURL,
    headers:{
        "Content-Type":"application/json",
    },
};

//user instance
let userInstance=axios.create(defaultOptions);

//auth token for all requests
userInstance.interceptors.request.use(function(config){
    const token=localStorage.token;
    config.headers.accesstoken=token;
    return config
});

export default userInstance;

