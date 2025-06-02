import Message from './Message'
import axios from 'axios'
import { useState, useEffect ,useRef} from "react";

function InChat({selectedChatId, handleBack, username}){
    const [messagesDTO, setMessages] = useState({ messages: [], times: [] })
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
            const response = await axios.post(
                "http://localhost:9999/api/v1/chats/"+ selectedChatId +"/messages",
                {
                    "text": input,
                    "sender": username,
                    "id": null
                }   
            ); 
            console.log('hello')
            setInput('')
            getMessages()
        }catch(error){}
    }
  
    return(
        <div className="text-white ml-6">   
            <button className="text-white mb-4" onClick={handleBack}>
              ← Back
            </button>
        <h2 className="text-2xl font-semibold mb-4">Hello</h2>
        <div className="bg-[#808080]  p-4 rounded-t-lg space-y-2  overflow-y-auto max-h-[470px] scrollbar-hide" ref={containerRef}>
            <ul className="space-y-2 flex-col ">
                {messagesDTO.messages.map((message, index) => (
                    <Message message={message} time={messagesDTO.times[index]} sender={messagesDTO.senders[index]} username={username}/>
                ))}
            </ul>
        </div>
        <form onSubmit={sendMessage}> 
            <input placeholder="Type something..." value={input} onChange={(e) => setInput(e.target.value)} className="placeholder:text-white bg-[#18181a] outline-none text-lg  w-[100%] p-3 rounded-b-lg"/>
            <button  className='hidden'>aa</button>
        </form>
       
        
        
        </div>
    );
}

export default InChat;