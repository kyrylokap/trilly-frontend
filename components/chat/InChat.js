import Message from './Message'
import { useState, useEffect ,useRef} from "react";
import ExitButton from '../ExitButton';
import { sendMessage, getMessages } from '../../services/inChatService';


function InChat({selectedChatId, handleBack, username, chatMembers, refreshChats}){
    const [messagesDTO, setMessages] = useState({ messages: [], times: [], senders:[] })
    const [input, setInput] = useState('')
    const containerRef = useRef(null);
    

    useEffect(() => {
        getMessages(selectedChatId, setMessages);
    }, [selectedChatId])

    useEffect(() => {
        const el = containerRef.current;
        if(el){
           el.scrollTop = el.scrollHeight;
        }
    }, [messagesDTO])



    return(
        <div className="text-white ml-6">  
            <div className='flex items-center gap-6'>
                <ExitButton getBack={handleBack}/>
                <h2 className="text-2xl font-semibold mb-4" > {chatMembers.filter((member) => member !== username).join(' ')}</h2>
            </div> 

            <div className="bg-transparent p-4 rounded-t-lg space-y-2  overflow-y-auto min-h-[500px] max-h-[500px] scrollbar-hide border-2 border-[gray]" ref={containerRef}>
                <ul className="space-y-2 flex-col ">
                    {messagesDTO.messages.map((message, index) => (
                        <Message key={index} message={message} time={messagesDTO.times[index]} sender={messagesDTO.senders[index]} username={username}/>
                    ))}
                </ul>
            </div>
            <form onSubmit={async (e) => {
                await sendMessage(e, selectedChatId, input, username, setInput, setMessages);
                refreshChats();}}> 
                <input placeholder="Type something..." value={input} onChange={(e) => setInput(e.target.value)} className="placeholder:text-white bg-transparent border-2 border-[gray] outline-none text-lg  w-full p-3 rounded-b-lg"/>
                <button  className='hidden'></button>
            </form>
        </div>
    );
}

export default InChat;