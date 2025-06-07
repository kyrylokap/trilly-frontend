

function Comments({comments, handleBack}){
    return(
        <div className="pl-3 pt-32 w-[30%]">
            <p className="text-white cursor-pointer" onClick={handleBack}>
                --Back
                </p>
            <ul key={comments} className="overflow-y-auto max-h-[480px] scrollbar-hide">
                {comments.map((comment) => {
                        return(
                            <li key={comment} className="pb-4 flex-col font-medium">
                                <div className="flex gap-3 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                    </svg>
                                    <p key={comment.username} className="text-white">
                                       {comment.username} 
                                    </p>
                                    
                                </div>
                                <div>
                                  <p className="text-xl text-white">
                                    {comment.text}
                                  </p>
                                  <p className="text-xl text-white">
                                    {comment.commentTime}
                                  </p>  
                                </div>
                                

                            </li>
                            
                        );
                        
                })}
            </ul>
        </div>
    );
}

export default Comments;