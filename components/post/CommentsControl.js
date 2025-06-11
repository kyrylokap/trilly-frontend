import axios from "axios";
import { useState, useEffect } from "react";


function CommentsControl({handleBack, postId, username, getProfile}){
    const [commentToSend, setComment] = useState('');

    const [comments,setComments] = useState([]);

    const getComments = async () => {
        try{
            const response = await axios.get('http://localhost:9999/api/v1/posts/'+ postId + '/comments')
            setComments(response.data)
        }
        catch(e){}
    }

    const sendComment = async () => {
        try{
            await axios.post(`http://localhost:9999/api/v1/posts/${postId}/comment`,
                {
                    "username": username,
                    "text": commentToSend
                }
            )
            getComments()
            setComment('')
        }
        catch(e){}
    }
    useEffect(() =>{
        getComments()
    }, [])

    return(
        <div className="pl-4  w-[30%] border-[#2a2a2e] border-2 border-l-0 mt-[99px] rounded-r-xl p-5 justify-between flex flex-col">
            
            <div>
                <p className="text-xl flex justify-center font-bold text-white">
                Comments
                </p>
                <p className="text-white cursor-pointer font-bold text-lg  flex flex-row items-center" onClick={handleBack}>
                    ←Back
                </p>
            </div>
            <ul className="overflow-y-auto  scrollbar-hide flex flex-col max-h-[250px]">
                
                
                {comments.map((comment) => {
                        return(
                            <li key={comment.id} className="pb-4 flex-col font-extralight text-gray-500 m-0 gap-0">
                                <div className="flex gap-3 cursor-pointer hover:text-white duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                    </svg>
                                    <p key={comment.username} className="font-normal text-white" onClick={() => getProfile(comment.username)}>
                                       {comment.username} 
                                    </p>
                                    
                                </div>
                                <div>
                                  <p className="text-lg text-white  break-words">
                                    {comment.text}
                                  </p>
                                  <p className="text-xs">
                                    {comment.commentTime}
                                  </p>  
                                </div>
                            </li>
                            
                        );
                        
                })}
            </ul>
            <form onSubmit={(e) => {
                e.preventDefault()
                    sendComment();    
                }
            }>
                <input value={commentToSend} onChange={(e) => {
                    setComment(e.target.value)
                }} className="w-[100%] rounded-lg p-1  outline-none placeholder:text-black" placeholder="Add comment..."/>
                <button className="hidden">a</button>
            </form>
            
        </div>
    );
}

export default CommentsControl;