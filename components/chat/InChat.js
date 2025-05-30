import Message from './Message'
import axios from 'axios'
import { useState, useEffect } from "react";

function InChat({selectedChatId, handleBack}){
    const [messagesDTO, setMessages] = useState({ messages: [], times: [] })
    const getMessages = async () => {
        try{
            const response = await axios.get(
                "http://localhost:9999/api/v1/chats/"+ selectedChatId +"/messages"
            )
            setMessages(response.data)
            console.log(response.statusText)
        }
        catch(error){}
    };
    useEffect(() => {
        getMessages();
    }, [selectedChatId])

  
    return(
        <div className="text-white ml-6">   
            <button className="text-white mb-4" onClick={handleBack}>
              ← Back
            </button>
        <h2 className="text-2xl font-semibold mb-4">Hello</h2>
        <div className="bg-[#808080]  p-4 rounded-t-lg space-y-2  overflow-y-auto max-h-[470px] scrollbar-hide">
            <ul className="space-y-2 flex-col ">
                {messagesDTO.messages.map((message, index) => (
                    <Message message={message} time={messagesDTO.times[index]}/>
                ))}
            </ul>
        </div>
        
        <input placeholder="Type something..." className="placeholder:text-white bg-[#18181a] outline-none text-lg  w-[100%] p-3 rounded-b-lg"/>
        
        
        </div>
    );
}

export default InChat;