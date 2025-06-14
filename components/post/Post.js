import { useState } from "react";

import PostContent from "./PostContent";
import PostInteraction from "./PostInteraction";
import Comments from "./CommentsControl";

function Post({post, getProfile, getBack, username}) {


    const [selectedComments, setSelectedComments] = useState(null);
    const handleBack = () => setSelectedComments(null);

    

    return(
        <div className="flex flex-row max-h-[700px] pl-4">
            <PostContent  post={post} getProfile={getProfile} getBack={getBack}/>
            
            {selectedComments === null ?
                (<PostInteraction postId={post.postId} username={post.username} setSelectedComments={setSelectedComments} post={post}/>): 
                (<Comments handleBack={handleBack} postId={post.postId} username={username} getProfile={getProfile}></Comments>)
            }
             
        </div>

    );
}


export default Post;