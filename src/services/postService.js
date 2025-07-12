import axios from 'axios'

export const likePost = async (setLike, postId) => {
    try{
        const response = await axios.post(`http://localhost:9999/api/v1/users/${postId}/user`,
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
        setLike(response.data)
    }
    catch(e){}
}

export const loadPosts = async () => {
    try{
        const response = await axios.get("http://localhost:9999/api/v1/users/posts",
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
        return response.data;
    }catch(e){}
}

export const post = async (place, mediaUrl, description, updateDescription, updatePhotoUrl, updatePlace, setRespText) => {
    try{
        await axios.post(`http://localhost:9999/api/v1/users/user/post`,{
            place: place,
            mediaUrl: mediaUrl,
            description: description
        },
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
        updateDescription(' ');
        updatePhotoUrl(' ');
        updatePlace(' ');
        setRespText(`Added new post to profile`)
    }
    catch(e){}
}

