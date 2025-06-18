

export default function Comment({comment, getProfile}) {
    return(
        <li key={comment.id} className=" flex-col font-extralight text-gray-500 break-all">
            <div className="flex cursor-pointer align-center " onClick={() => getProfile(comment.username)}>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="white" viewBox="0 0 16 16"
                    className="w-[clamp(1px,3vw,24px)] h-[clamp(1px,2vw,24px)] mt-1">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <p key={comment.username} className="text-[clamp(2px,2.3vw,25px)] text-[#6a6a6e] hover:text-white duration-300">
                   {comment.username} 
                </p>
            </div>
            <div>
              <p className="text-[clamp(2px,2.3vw,24px)] text-white  break-words flex align-center">
                {comment.text}
              </p>
              <p className="text-[clamp(2px,1.5vw,18px)]">
                {comment.commentTime}
              </p>  
            </div>
        </li>
        
    );
}