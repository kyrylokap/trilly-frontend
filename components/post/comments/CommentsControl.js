
import { useState, useEffect } from "react";
import Comment from "./Comment";
import ExitButton from "../../ExitButton";
import { getComments, sendComment } from "../../../services/commentsService";

function CommentsControl({handleBack, postId, username, setUserProfile}){
    const [commentToSend, setComment] = useState('');

    const [comments,setComments] = useState([]);

    

    
    useEffect(() =>{
        getComments(setComments, postId);
    }, [])
    
    return(
        <div className="pl-4 aspect-[4/3] border-[#2a2a2e] border-2 border-l-0 mt-[99px] rounded-r-xl p-5  flex flex-col justify-between w-[30%] ">
               <div className="flex flex-row gap-4">
                <ExitButton getBack={handleBack}/>
                <p className=" text-[clamp(12px,1.4vw,20px)] text-xl truncate font-bold text-white ">
                    Comments
                </p>
            </div>
            
            <ul className=" overflow-y-auto scrollbar-hide  flex-1">
                {comments.map((comment) => {
                    return <Comment comment={comment} setUserProfile={setUserProfile}/>;
                })}
            </ul> 
        
            <form onSubmit={(e) => {e.preventDefault();
                                    sendComment(username, commentToSend, postId, setComment, setComments);}}>
                <input value={commentToSend} onChange={(e) => {
                    setComment(e.target.value)
                }} className="w-full rounded-lg px-2 py-[clamp(2px,0.4vw,10px)]  text-black
                            text-[clamp(10px,1vw,18px)] 
                            outline-none placeholder:text-[clamp(10px,1vw,25px)] 
                          placeholder:text-black" placeholder="Add comment..."/>
                <button className="hidden"></button>
            </form>
            
        </div>
    );
}

export default CommentsControl;