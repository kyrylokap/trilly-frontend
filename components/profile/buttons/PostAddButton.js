

export default function PostAddButton({addPost}){
    return(
        <div className="flex justify-center  items-center group gap-1 cursor-pointer" onClick={() => addPost(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
            className="group-hover:text-[gray] duration-200 text-white cursor-pointer   "
            viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            <p className="group-hover:text-[gray] duration-200 text-transparent hidden md:block">Add post</p>
        </div>
        
    );
}