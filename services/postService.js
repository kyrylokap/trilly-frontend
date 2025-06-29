import axios from 'axios'

export const likePost = async (setLike, postId, username) => {
    try{
        const response = await axios.post(`http://localhost:9999/api/v1/users/${postId}/${username}`);
        setLike(response.data)
    }
    catch(e){}
}

export const loadPosts = async (setPosts) => {
    try{
        const response = await axios.get("http://localhost:9999/api/v1/users/posts")
        setPosts(response.data)
    }catch(e){}
}