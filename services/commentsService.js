import axios from 'axios';

const url = "http://localhost:9999/api/v1/posts/";

export const sendComment = async (username, commentToSend, postId,  setComment, setComments) => {
        try{
            await axios.post(`${url}${postId}/comment`,
                {
                    "username": username,
                    "text": commentToSend
                }
            )
            getComments(setComments, postId)
            setComment('')
        }
        catch(e){}
}

export const getComments = async (setComments, postId) => {
    try{
        const response = await axios.get('http://localhost:9999/api/v1/posts/'+ postId + '/comments')
        setComments(response.data)
    }
    catch(e){}
}
     