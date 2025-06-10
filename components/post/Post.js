import { useState, useEffect } from "react";

import PostContent from "./PostContent";
import PostInteraction from "./PostInteraction";
import Comments from "./CommentsControl";

function Post({post, username, getProfile, getBack}) {


    const [selectedComments, setSelectedComments] = useState(null);
    const handleBack = () => setSelectedComments(null);

    

    return(
        <div className="flex flex-row max-h-[700px] ">
            <PostContent  className={"ml-7 mt-7 text-white w-[60%] text-thin"} post={post} getProfile={getProfile} getBack={getBack}/>
            
            {selectedComments === null ?
                (<PostInteraction postId={post.postId} username={username} setSelectedComments={setSelectedComments} post={post}/>): 
                (<Comments handleBack={handleBack} postId={post.postId} username={username} getProfile={getProfile}></Comments>)
            }
             
        </div>

    );
}


export default Post;