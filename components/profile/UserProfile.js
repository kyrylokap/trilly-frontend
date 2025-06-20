import { useState, useEffect } from "react";
import axios from 'axios'
import Post from "../post/Post";
import UserList from "./UserList";
import UserProfileInfo from "./UserProfileInfo";
import ChangePasswordForm from "./ChangePasswordForm";
import ExitButton from '../ExitButton'

function UserProfile({profile, getBack, username, getProfile, setSelectedChat, changeAside}) {
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
                    
                    <ExitButton getBack={getBack}/>
                    <div className="flex flex-col gap-8 p-2">
                        <div className="flex flex-row">
                        <UserProfileInfo changeAside={changeAside} profileUsername={profile.username} showFollowers={showFollowers} followersCount={followersCount} 
                            showFollowings={showFollowings} followingsCount={profile.followingsCount} username={username} follow={follow} 
                            setFollowersCount={setFollowersCount} getFollow={getFollow} openSettings={openSettings} setSelectedChat={setSelectedChat}/>

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