import { followUser } from "../../../services/userProfileService";

function FollowButton({follow, profileUsername, setFollowersCount, getFollow, setUserProfile}) {
    return(
        <button onClick={(e) => followUser(follow, profileUsername, setFollowersCount, getFollow, setUserProfile)} 
            className={`w-36 bg-black text-xl font-light tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500 ${localStorage.getItem("username") === profileUsername && `hidden`}`}>
            {follow === false ? <p>Follow</p> : <p>Unfollow</p>}
        </button>
    );
}

export default FollowButton;