import { useState, useEffect } from "react";
import axios from 'axios'
import Post from "../post/Post";
import UserList from "./UserList";
import UserProfileInfo from "./UserProfileInfo";
import ExitButton from '../ExitButton'
import AddPost from "./AddPost";


function UserProfile({profile, getBack, username, setUserProfile, setSelectedChat, 
                    changeAside}) {
    const [follow, setFollow] = useState(false);
    const getFollow =  async() =>{
        try{
            const response = await axios.get('http://localhost:9999/api/v1/users/user/checkFollow',{
                params:{
                    firstUsername:username,
                    secondUsername:profile.username
                }
            })
            setFollow(response.data)
        }catch(e){}
    }
    const [followersCount, setFollowersCount] = useState(profile.followersCount);

    useEffect(() => {
        setFollowersCount(profile.followersCount);
        getFollow();
    }, [profile.username]);

    const [followings, setFollowings] = useState(false);
    const showFollowings = () =>{
        setFollowings(true)
    }

    const [followers, setFollowers] = useState(false);
    const showFollowers = () =>{
        setFollowers(true)
    }

    const close = () => {
        setFollowers(false);
        setFollowings(false);
    }
    
    
    

    return(
        <div className="text-white flex flex-col">
                {followings && <UserList choose={true} username={profile.username} close={close} setUserProfile={setUserProfile}/>}
                {followers && <UserList choose={false} username={profile.username} close={close} setUserProfile={setUserProfile}/>}
                   


                <ExitButton getBack={getBack}/>
                <div className="flex flex-col gap-8 p-2">
                    <div className="flex flex-row">
                        <UserProfileInfo changeAside={changeAside} profileUsername={profile.username} showFollowers={showFollowers} followersCount={followersCount} 
                            showFollowings={showFollowings} followingsCount={profile.followingsCount} username={username} follow={follow} 
                            setFollowersCount={setFollowersCount} getFollow={getFollow}setSelectedChat={setSelectedChat}/>
                         
                    </div>
                    <div className="flex flex-col">
                        <ul>
                        {profile.posts.map((post) =>{
                            return(<Post post={post} username={username} setUserProfile={setUserProfile}/>);
                            })}
                        </ul>
                    </div> 
                </div>
        </div>    
    );
}

export default UserProfile;