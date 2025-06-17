import { useEffect, useState } from "react";
import Post from "./post/Post";
import axios from 'axios'
import UserProfile from "./profile/UserProfile";
import Search from "./Search";
function Posts({username, changeAside, aside}){

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
        <div className={`h-[85vh]  bg-[#18181a]  overflow-auto scrollbar-hide`}>
            <Search getProfile={getProfile} setUserProfile={setUserProfile}/>
            {profile === null ? 
                    (<div>
                        <ul>
                            {posts.map((post) =>{
                                return(<Post post={post} getProfile={getProfile} username={username}/>);
                                })}
                        </ul>
                        <h1 className="text-2xl mt-6 mb-3 text-white text-center">
                            That's all...
                        </h1>
                    </div>) :
                 (<UserProfile profile={profile} getBack={getBack} username={username} getProfile={getProfile}/>)}
            
                                
        </div> 
    );
}

export default Posts;