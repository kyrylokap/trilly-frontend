 

function UserProfilePost({post, getBack}) {
    return(
        <div key={post} className="w-[90%]">
            <div className="flex items-center mb-7">
            </div>
            <img src={post.mediaUrl} alt="photo" className="min-w-full rounded-lg "/>
            <p>{post.description}</p>
        </div>
    );
}

export default UserProfilePost;