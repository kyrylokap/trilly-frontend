
import { useEffect, useState } from "react";
import Likes from "./postInteractionMembers/Likes";
import Shares from "./postInteractionMembers/Shares";
import Comments from "./postInteractionMembers/Comments";
import { checkIfLiked, likePost } from "../../services/postService";
import { sendNotification } from "../../services/notificationService";

function PostInteraction({postId, setSelectedComments, post, stompClient}){

    const [like, setLike] = useState(false);
    useEffect(() => {
        checkIfLiked(setLike, postId);
    },[postId])
    
    return(
            <div className="w-[30%] pl-3 pt-6 select-none font-thin flex flex-col  border-[#2a2a2e] border-2 border-l-0 mt-[99px] rounded-r-xl ">
                <div className="text-xs text-white md:text-base lg:text-2xl">
                    <Likes  likePost={() => {
                        likePost(setLike, postId);
                        sendNotification(post.username, " liked your post ", stompClient);
                    }}
                        post={post} like={like} />

                    <Shares stompClient={stompClient} mediaUrl={post.mediaUrl}/>
                    <Comments setSelectedComments={setSelectedComments}/>
                </div>
                <div className="flex gap-4 whitespace-normal flex-wrap items-center">
                    <p className="text-white p-0 font-thin  break-words text-ellipsis text-[1.5vw] text-xs sm:text-xs lg:text-2xl">{post.description}</p>
                </div>
                
            </div>
    );
}


export default PostInteraction;