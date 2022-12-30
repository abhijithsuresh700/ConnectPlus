import axios from '../Axios/axios';
import userInstance from '../Axios/userAuth';

export const deletePost = (postId)=>userInstance.post(`/deletePost/${postId}`)