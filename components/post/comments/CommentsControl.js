import axios from "axios";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import ExitButton from "../../ExitButton";

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
        <div className="pl-4 aspect-[4/3] border-[#2a2a2e] border-2 border-l-0 mt-[99px] rounded-r-xl p-5  flex flex-col justify-between w-[30%] ">
               <div className="flex flex-row gap-4">
                <ExitButton getBack={handleBack}/>
                <p className=" text-[clamp(12px,1.4vw,20px)] text-xl truncate font-bold text-white ">
                    Comments
                </p>
            </div>
            
            <ul className=" overflow-y-auto scrollbar-hide  flex-1">
                {comments.map((comment) => {
                    return <Comment comment={comment} getProfile={getProfile}/>;
                })}
            </ul> 
        
            <form onSubmit={(e) => {e.preventDefault();sendComment();}}>
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