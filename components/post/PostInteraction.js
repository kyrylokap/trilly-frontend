import axios from "axios";
import { useState } from "react";
import Likes from "./postInteractionMembers/Likes";
import Shares from "./postInteractionMembers/Shares";
import Comments from "./postInteractionMembers/Comments";

function PostInteraction({postId, username, setSelectedComments, post }){

    const [like, setLike] = useState(false);
    
    const likePost = async () => {
        try{
            const response = await axios.post(`http://localhost:9999/api/v1/users/${postId}/${username}`);
            setLike(response.data)
        }
        catch(e){}
    }

    

    return(
            <div className="w-[30%] pl-3 pt-32 select-none font-thin flex flex-col justify-between">
            <div >
                <Likes likePost={likePost} post={post} like={like} />
                <Shares />
                <Comments setSelectedComments={setSelectedComments}/>
            </div>
            <p className="text-white p-0 text-xl font-medium pb-3">{post.description}</p>
        </div>
    );
}


export default PostInteraction;