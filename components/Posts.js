import { useEffect, useState } from "react";
import Post from "./post/Post";
import axios from 'axios'
import UserProfile from "./user/UserProfile";
import Search from "./Search";
function Posts({username}){

    const [posts, setPosts] = useState([]);
    
    const loadPosts = async () => {
        try{
            const response = await axios.get("http://localhost:9999/api/v1/users/" + username + "/posts")
            setPosts(response.data)
        }catch(e){}
    }

    useEffect(() => {
        loadPosts()
    }, [username])

    const [profile, setUserProfile] = useState(null);
    
    const getProfile = async (profileUsername) =>{
        try{
            const response = await axios.get("http://localhost:9999/api/v1/user/" + profileUsername)
            setUserProfile(response.data)
        }catch(e){}
    }

    const getBack = async () =>{
        setUserProfile(null)
    }

    return(
        <div className="h-[80vh] w-[60vw] bg-[#18181a]  overflow-auto scrollbar-hide">
            <Search getProfile={getProfile} setUserProfile={setUserProfile}/>
            {profile === null ? 
                    (<div>
                        <ul>
                            {posts.map((post) =>{
                                return(<Post post={post} username={username} getProfile={getProfile}/>);
                                })}
                        </ul>
                        <h1 className="text-2xl mt-6 mb-3 text-white text-center">
                            That's all...
                        </h1>
                    </div>) :
                 (<UserProfile profile={profile} getBack={getBack} username={username}/>)}
            
        
        </div> 
    );
}

export default Posts;