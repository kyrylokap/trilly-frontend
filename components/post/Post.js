import { useState, useEffect } from "react";

import PostContent from "./PostContent";
import PostInteraction from "./PostInteraction";
import Comments from "./CommentsControl";

function Post({post, username}) {


    const [selectedComments, setSelectedComments] = useState(null);
    const handleBack = () => setSelectedComments(null);

    

    return(
        <div className="flex flex-row max-h-[700px]">
            <PostContent post={post}/>
            
            {selectedComments === null ?
                (<PostInteraction postId={post.postId} username={username} setSelectedComments={setSelectedComments} post={post}/>): 
                (<Comments handleBack={handleBack} postId={post.postId} username={username}></Comments>)
            }
             
        </div>

    );
}


export default Post;