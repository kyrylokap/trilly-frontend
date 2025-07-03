
import { useState } from "react";
import Likes from "./postInteractionMembers/Likes";
import Shares from "./postInteractionMembers/Shares";
import Comments from "./postInteractionMembers/Comments";
import { likePost } from "../../services/postService";

function PostInteraction({postId, setSelectedComments, post}){

    const [like, setLike] = useState(false);
    
    return(
            <div className="w-[30%] pl-3 pt-6 select-none font-thin flex flex-col  border-[#2a2a2e] border-2 border-l-0 mt-[99px] rounded-r-xl ">
                <div className="text-[1.2vw]">
                    <Likes  likePost={() => likePost(setLike, postId, localStorage.getItem("username"))} post={post} like={like} />
                    <Shares  mediaUrl={post.mediaUrl}/>
                    <Comments setSelectedComments={setSelectedComments}/>
                </div>
                <div className="flex gap-4 whitespace-normal flex-wrap items-center">
                    <p className="text-white p-0 font-thin pb-3 break-words text-ellipsis text-[1.5vw] text-xs sm:text-base md:text-2xl">{post.description}</p>
                </div>
                
            </div>
    );
}


export default PostInteraction;