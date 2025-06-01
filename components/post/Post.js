
import PostContent from "./PostContent";
import PostInteraction from "./PostInteraction";


function Post({post, username}) {
    return(
        <div className="flex flex-row select-none">
            <PostContent post={post}/>
            <PostInteraction postId={post.postId} username={username}/>    
        </div>

    );
}


export default Post;