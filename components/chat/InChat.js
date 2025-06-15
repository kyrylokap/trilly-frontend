import Message from './Message'
import axios from 'axios'
import { useState, useEffect ,useRef} from "react";

function InChat({selectedChatId, handleBack, username, chatMembers}){
    const [messagesDTO, setMessages] = useState({ messages: [], times: [], senders:[] })
    const [input, setInput] = useState('')
    const containerRef = useRef(null);
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

    useEffect(() => {
        const el = containerRef.current;
        if(el){
           el.scrollTop = el.scrollHeight;
        }
    }, [messagesDTO])

    const sendMessage = async (e) => {
        e.preventDefault();
        try{
            await axios.post(
                "http://localhost:9999/api/v1/chats/"+ selectedChatId +"/messages",
                {
                    "text": input,
                    "sender": username,
                    "id": null
                }   
            ); 
            setInput('')
            getMessages()
        }catch(error){}
    }
    
                

    return(
        <div className="text-white ml-6">  
        <div className='flex items-center gap-6'>
            <div onClick={handleBack} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4" > {chatMembers.filter((member) => member !== username).join(' ')}</h2>
        </div> 
            
        <div className="bg-transparent p-4 rounded-t-lg space-y-2  overflow-y-auto max-h-[500px] scrollbar-hide border-2 border-[gray]" ref={containerRef}>
            <ul className="space-y-2 flex-col ">
                {messagesDTO.messages.map((message, index) => (
                    <Message key={index} message={message} time={messagesDTO.times[index]} sender={messagesDTO.senders[index]} username={username}/>
                ))}
            </ul>
        </div>
        <form onSubmit={sendMessage}> 
            <input placeholder="Type something..." value={input} onChange={(e) => setInput(e.target.value)} className="placeholder:text-white bg-transparent border-2 border-[gray] outline-none text-lg  w-full p-3 rounded-b-lg"/>
            <button  className='hidden'>aa</button>
        </form>
       
        
        
        </div>
    );
}

export default InChat;