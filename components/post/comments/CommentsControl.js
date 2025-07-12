
import { useState, useEffect } from "react";
import Comment from "./Comment";
import ExitButton from "../../ExitButton";
import { getComments, sendComment } from "../../../services/commentsService";
import Loader from "../../Loader";
import { sendNotification } from "../../../services/notificationService";

function CommentsControl({handleBack, postId, setUserProfile, profileUsername, stompClient}){
    const [commentToSend, setComment] = useState('');

    const [comments,setComments] = useState([]);

    
    
    
    useEffect(() =>{
        getComments(setComments, postId);
    }, [])
    
    return(
        <div className="pl-4 aspect-[4/3] border-[#2a2a2e] border-2 border-l-0 mt-[99px] rounded-r-xl p-5  flex flex-col justify-between w-[30%] ">
               <div className="flex flex-row gap-3">
                <ExitButton getBack={handleBack}/>
                <p className=" text-[10px] md:text-lg lg:text-2xl truncate  text-white ">
                    Comments
                </p>
            </div>
            

            {comments.length === 0 ? 
                <div className=" flex justify-center items-center flex-1 h-full">
                    <Loader /> 
                </div>
                : 
            <ul className=" overflow-y-auto scrollbar-hide  flex-1">
                {comments.map((comment) => {
                    return <Comment stompClient={stompClient} comment={comment} setUserProfile={setUserProfile}/>;
                })}
            </ul> }

            
            
        
            <form onSubmit={(e) => {e.preventDefault();
                                    sendComment(localStorage.getItem("username"), commentToSend, postId, setComment, setComments);
                                    sendNotification(profileUsername, ` comments your post`, stompClient);}}>
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