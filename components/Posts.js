import { useEffect, useState } from "react";
import Post from "./post/Post";
import axios from 'axios'
import UserProfile from "./profile/UserProfile";
import Search from "./Search";
function Posts({username, changeAside, aside, setSelectedChat,profile, setUserProfile}){

    const [posts, setPosts] = useState([]);
    
    const loadPosts = async () => {
        try{
            const response = await axios.get("http://localhost:9999/api/v1/users/posts")
            setPosts(response.data)
        }catch(e){}
    }

    useEffect(() => {
        loadPosts()
    }, [username])

    
    const getBack = async () =>{
        setUserProfile(null)
    }

    return(
        <div className={`h-[85vh]  bg-[#18181a]  overflow-auto scrollbar-hide`}>
            <Search  setUserProfile={setUserProfile} username={username}/>
            {profile === null ? 
                (<div>
                    <ul>
                        {posts.map((post) =>{
                            return(<Post key={post.postId} post={post} setUserProfile={setUserProfile} username={username}/>);
                            })}
                    </ul>
                    <h1 className="text-2xl mt-6 mb-3 text-white text-center">
                        That's all...
                    </h1>
                </div>) :

                (<UserProfile profile={profile} changeAside={changeAside} 
                    getBack={getBack} username={username} setUserProfile={setUserProfile} setSelectedChat={setSelectedChat}/>)}          
        </div> 
    );
}

export default Posts;