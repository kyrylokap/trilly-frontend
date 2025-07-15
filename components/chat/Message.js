import { useState } from "react";
import MessageMenu from "./MessageMenu";


function Message({message, setInput,  setChangingMessage,  setId, setIsChanging, selectedChatId, stompClient}){
    const [messageMenu, setMessageMenu] = useState(false);


    return(
            <div onClick={() => {
            if(localStorage.getItem("username") === message.sender){
                setMessageMenu(prev => !prev);
            }}}  className={`flex flex-col  relative  inline-block ${localStorage.getItem("username") === message.sender ? 'items-end' : 'items-start'}`}>

            {messageMenu && <MessageMenu selectedChatId={selectedChatId}  setIsChanging={setIsChanging} stompClient={stompClient}
                            setId={setId}  setChangingMessage={setChangingMessage} message={message} />}
            
            
            <li className={`max-w-[50%] ${localStorage.getItem("username") === message.sender ? "bg-zinc-800 rounded-l-xl  " : "bg-slate-600 rounded-r-xl"}
                     text-white p-3 w-fit  rounded-t-xl break-all`}>
                {message.type === "text" ? 
                    <p>{message.message}</p> : 
                    <img src={message.message} alt={`photo`}></img>
                }
             </li>
             <div className="text-white text-sm flex items-center">
                
                <p className="pr-2">
                    {message.time}
                </p>
                 
                {message.seen ?  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"  viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0
                         .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                    </svg>
                </p> 
                :
                <p>
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                   <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                   </svg>
                </p>
                }
                {message.edited && <p>Edited</p>}
             </div>
        </div>
        
    );
}


export default Message;