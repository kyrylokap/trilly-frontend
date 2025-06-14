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
            <div className="w-[30%] pl-3 pt-8 select-none font-thin flex flex-col  border-[#2a2a2e] border-2 border-l-0 mt-[99px] rounded-r-xl">
                <div >
                    <Likes likePost={likePost} post={post} like={like} />
                    <Shares />
                    <Comments setSelectedComments={setSelectedComments}/>
                </div>
                <div className="flex gap-4 whitespace-normal flex-wrap items-center">
                    <p className="text-white p-0 text-lg font-thin pb-3 break-words text-ellipsis">{post.description}</p>
                   
                </div>
                
            </div>
    );
}


export default PostInteraction;