
function Likes({likePost, post, like}){
    return(
        <div className={`flex items-center gap-2 cursor-pointer pb-3 `} onClick={likePost}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-heart-fill ${like ? 'text-red-600' : 'text-white'} cursor-pointer`}  viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                    <div className="text-white flex gap-2">
                       <p >
                        {post.likesCount}
                        </p>
                    Likes 
                    </div>
                </div>
    );
}

export default Likes;