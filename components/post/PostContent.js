

function PostContent({post, getProfile, className}) {
    return(
        <div key={post} className={`"ml-7 mt-7 text-white w-[60%] text-thin"`}>
            <div className="flex items-center mb-7 cursor-pointer gap-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"  width="44" height="44" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>

                    <p className="ml-6" onClick={() => getProfile(post.username)}>{post.username}</p>
                </div>
                <div className="flex items-center">
                   <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                <p>{post.place}</p> 
                </div>
                
            </div>
            <img src={post.mediaUrl} alt="photo" className="min-w-full rounded-l-lg "/>
            
        </div>
    );
}



export default PostContent;