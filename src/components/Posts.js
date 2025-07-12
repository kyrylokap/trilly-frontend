import { useEffect, useState } from "react";
import Post from "./post/Post";
import { loadPosts } from "../services/postService";
import UserProfile from "./profile/UserProfile";
import Search from "./Search";
import Loader from "./Loader";
function Posts({changeAside, aside, setSelectedChat,profile, setUserProfile, stompClient}){

    const [posts, setPosts] = useState([]);
    const getBack = async () => setUserProfile(null);

    useEffect(() => {
    const fetchInitial = async () => {
      const data = await loadPosts();
      setPosts(data); 
    };

    fetchInitial();
    },[localStorage.getItem("username")]);

    


    const loadMore = async () => {
      const data = await loadPosts();
      setPosts(prevPosts => [...prevPosts, ...data]);
    };

    return(
        <div className={`h-[85vh]  bg-[#18181a]  overflow-auto `}>
            <Search setUserProfile={setUserProfile} stompClient={stompClient}/>
            {posts.length === 0 && <Loader />}
            {profile === null ? 
                (<div>
                    <ul>
                        {posts.map((post) =>{
                            return(<Post stompClient={stompClient} key={post.postId} post={post} setUserProfile={setUserProfile} />);
                            })}
                    </ul>
                    <div className="text-center  flex justify-center p-4 cursor-pointer group">
                        <p onClick={loadMore} className="text-white text-xl   border-white border-1 border-b group-hover:text-[gray] duration-300">
                            Load more
                        </p>  
                    </div>
                </div>) :

                (<UserProfile stompClient={stompClient} profile={profile} changeAside={changeAside} 
                    getBack={getBack} setUserProfile={setUserProfile} setSelectedChat={setSelectedChat}/>)}          
        </div> 
    );
}

export default Posts;