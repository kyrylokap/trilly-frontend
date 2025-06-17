
function FollowButton({followUser, follow, username, profileUsername}) {
    return(
        <button onClick={followUser} 
            className={`w-36 bg-black text-xl font-light tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500 ${username === profileUsername && `hidden`}`}>
            {follow === false ? <p>Follow</p> : <p>Unfollow</p>}
        </button>
    );
}

export default FollowButton;