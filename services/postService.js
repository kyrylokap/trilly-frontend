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

export const post = async (username, place, mediaUrl, description) => {
    try{
        await axios.post(`http://localhost:9999/api/v1/users/${username}/post`,{
            place: place,
            mediaUrl: mediaUrl,
            description: description
        }); 
    }
    catch(e){}
}