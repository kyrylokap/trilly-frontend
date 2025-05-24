import PostContent from "./PostContent";
import PostInteraction from "./PostInteraction";


function Post({post}) {
    return(
        <div className="flex flex-row">
            <PostContent post={post}/>
            <PostInteraction />    
        </div>

    );
}


export default Post;