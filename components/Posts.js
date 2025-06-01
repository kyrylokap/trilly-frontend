import { useState } from "react";
import Post from "./post/Post";
import axios from 'axios'

function Posts({username}){

    const [posts, setPosts] = useState([]);
    
    const loadPosts = async () => {
        try{
            const response = await axios.get("http://localhost:9999/api/v1/users/" + username + "/posts")
            setPosts(response.data)
        }catch(e){}
    }

    useState(() => {
        loadPosts()
    })
    
    return(
        <div className="h-[80vh] w-[60vw] bg-[#18181a]  overflow-auto scrollbar-hide">
            <ul>
                {posts.map(
                    (post) =>{
                        return(
                            <Post post={post} username={username}/>
                        );    
                    }
                )}
            </ul>
            <h1 className="text-2xl mt-6 mb-3 text-white text-center">
                That's all...
            </h1>
        </div> 
    );
}

export default Posts;