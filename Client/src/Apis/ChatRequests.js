import axios from 'axios'
import userInstance from '../Axios/userAuth';


const API = axios.create({ baseURL: 'http://localhost:9000' });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const getUser=(id)=>API.get(`/userData/${id}`)

export const getAllNotifications = (userId) => userInstance.get(`/user/notification/${userId}`)

export const findSearch = (data)=> userInstance.get(`/user/search/${data}`)