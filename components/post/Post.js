import { useState } from "react";
import PostContent from "./PostContent";
import PostInteraction from "./PostInteraction";
import CommentsControl from "./comments/CommentsControl";

function Post({post, getBack, setUserProfile}){


    const [selectedComments, setSelectedComments] = useState(null);
    const handleBack = () => setSelectedComments(null);

    

    return(
        <li className="flex flex-row pl-4 h-auto" >
            <PostContent  post={post} setUserProfile={setUserProfile} getBack={getBack}/>
            
            {selectedComments === null ?
                (<PostInteraction postId={post.postId}  setSelectedComments={setSelectedComments} post={post}/>): 
                (<CommentsControl handleBack={handleBack} postId={post.postId}  setUserProfile={setUserProfile}></CommentsControl>)
            }
             
        </li>

    );
}


export default Post;