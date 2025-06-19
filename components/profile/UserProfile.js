import { useState, useEffect } from "react";
import axios from 'axios'
import Post from "../post/Post";
import UserList from "./UserList";
import UserProfileInfo from "./UserProfileInfo";
import ChangePasswordForm from "./ChangePasswordForm";

function UserProfile({profile, getBack, username, getProfile}) {
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
    
    const [settings, setSettings] = useState(false);
    const openSettings = () =>{
        setSettings(!settings);
    }


    return(
        <div className="text-white flex flex-col">
                    {followings && <UserList choose={true} username={profile.username} close={close} getProfile={getProfile}/>}
                    {followers && <UserList choose={false} username={profile.username} close={close} getProfile={getProfile}/>}
                    
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={getBack} className="ml-3 cursor-pointer w-[clamp(1px,3vw,24px)] h-[clamp(1px,2vw,24px)]" fill="white" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                    <div className="flex flex-col gap-8 p-2">
                        <div className="flex flex-row">
                        <UserProfileInfo profileUsername={profile.username} showFollowers={showFollowers} followersCount={followersCount} 
                            showFollowings={showFollowings} followingsCount={profile.followingsCount} username={username} follow={follow} 
                            setFollowersCount={setFollowersCount} getFollow={getFollow} openSettings={openSettings} />

                    <ChangePasswordForm username={username} settings={settings}/>    
                        
                    </div>
                    <div className="flex flex-col">
                            <ul>
                            {profile.posts.map((post) =>{
                                return(<Post post={post} username={username} getProfile={getProfile}/>);
                                })}
                        </ul>
                
                        </div> 
                                
                </div>
                
                   
        </div>    
    );
}

export default UserProfile;