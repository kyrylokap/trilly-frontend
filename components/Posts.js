import { useEffect, useState } from "react";
import Post from "./post/Post";
import { loadPosts } from "../services/postService";
import UserProfile from "./profile/UserProfile";
import Search from "./Search";
import Loader from "./Loader";
function Posts({changeAside, aside, setSelectedChat,profile, setUserProfile}){

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        loadPosts(setPosts);
    }, [localStorage.getItem("username")])

    const getBack = async () => setUserProfile(null);

    return(
        <div className={`h-[85vh]  bg-[#18181a]  overflow-auto scrollbar-hide`}>
            <Search setUserProfile={setUserProfile} />
            {posts.length === 0 && <Loader />}
            {profile === null ? 
                (<div>
                    <ul>
                        {posts.map((post) =>{
                            return(<Post key={post.postId} post={post} setUserProfile={setUserProfile} />);
                            })}
                    </ul>
                    <h1 className="text-2xl mt-6 mb-3 text-white text-center">
                        That's all...
                    </h1>
                </div>) :

                (<UserProfile profile={profile} changeAside={changeAside} 
                    getBack={getBack} setUserProfile={setUserProfile} setSelectedChat={setSelectedChat}/>)}          
        </div> 
    );
}

export default Posts;