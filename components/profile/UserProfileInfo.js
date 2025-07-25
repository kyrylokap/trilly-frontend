

import BlockButton from "./buttons/BlockButton";
import FollowButton from "./buttons/FollowButton";
import OpenChatButton from "./buttons/OpenChatButton";

function UserProfileInfo({profileUsername, showFollowers, followersCount, showFollowings, 
                        followingsCount, follow, setFollowersCount, 
                        getFollow, setSelectedChat,
                        changeAside, setUserProfile, stompClient}) {
    

    return(
        <div className="ml-16">
            <div className="flex flex-row items-center gap-4 ">
                <svg xmlns="http://www.w3.org/2000/svg"  width="44" height="44" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                <p>{profileUsername}</p>
            </div>
            <div className="flex flex-col mr-10 ">
                <div className="flex flex-row gap-3 mt-6 cursor-pointer" >
                    <div className="flex flex-col " onClick={showFollowers}>
                        <p className="hover:text-[gray] duration-300">Followers</p>
                        {followersCount}
                    </div>

                    <div className="flex flex-col cursor-pointer" onClick={showFollowings}>
                        <p className="hover:text-[gray] duration-300">Followings</p>
                        {followingsCount}
                    </div>
                </div>
                <FollowButton stompClient={stompClient} setUserProfile={setUserProfile}  profileUsername={profileUsername} follow={follow} setFollowersCount={setFollowersCount} getFollow={getFollow}/>
                <BlockButton  profileUsername={profileUsername}/>
                <OpenChatButton  profileUsername={profileUsername} setSelectedChat={setSelectedChat} changeAside={changeAside}/>
            </div>
        </div>
    );
}

export default UserProfileInfo;