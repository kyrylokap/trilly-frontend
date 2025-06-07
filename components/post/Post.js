import { useState, useEffect } from "react";

import PostContent from "./PostContent";
import PostInteraction from "./PostInteraction";
import axios from 'axios';
import Comments from "./Comments";

function Post({post, username}) {

    const [comments, setComments] = useState();

    const getComments = async () => {
        try{
            const response = await axios.get(`http://localhost:9999/api/v1/posts/${post.postId}/comments`);
            setComments(response.data)
        }catch (e){}
    }


    const [selectedComments, setSelectedComments] = useState(null);
    const handleBack = () => setSelectedComments(null);

    useEffect(() =>{
        getComments();
    },[])

    return(
        <div className="flex flex-row ">
            <PostContent post={post}/>
            {selectedComments === null ?
                (<PostInteraction postId={post.postId} username={username} setSelectedComments={setSelectedComments} post={post}/>): 
                (<Comments handleBack={handleBack} comments={comments}></Comments>)
            }
             
        </div>

    );
}


export default Post;