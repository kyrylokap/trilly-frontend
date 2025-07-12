import Message from './Message'
import { useState, useEffect ,useRef} from "react";
import ExitButton from '../ExitButton';
import {  getMessages, sendMessageSocket } from '../../services/inChatService';
import Loader from '../Loader';
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
function InChat({selectedChatId, handleBack, chatMembers, setChats}){
    const [messagesDTO, setMessages] = useState({ messages: [], times: [], senders:[], types: [] })
    const [input, setInput] = useState('')
    const containerRef = useRef(null);
    const stompClient = useRef(null);

    useEffect(() => {
        getMessages(selectedChatId, setMessages);
    }, [selectedChatId])

    useEffect(() => {
        const el = containerRef.current;
        if(el){
           el.scrollTop = el.scrollHeight;
        }
    }, [messagesDTO])

    useEffect(() => {

    stompClient.current = new Client({
        webSocketFactory: () => new SockJS("http://localhost:9999/ws"),
        reconnectDelay: 5000,
        connectHeaders: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        onConnect: () => {
            stompClient.current.subscribe("/topic/messages", (msg) => {
            const message = JSON.parse(msg.body);
            if (message.chatId === selectedChatId){
                setMessages(prev => ({
                    messages: [...prev.messages, message.text],
                    times: [...prev.times, message.time],
                    senders: [...prev.senders, message.sender],
                    types: [...(prev.types ), message.type]
                }));
            }
        });

    stompClient.current.subscribe("/topic/typing", (msg) => {
        const typingData = JSON.parse(msg.body);
        if (
            typingData.chatId === selectedChatId &&
            typingData.username !== localStorage.getItem("username")
        ) {
            if (typingData.typing) {
                setTypingUser(typingData.username);
            } else {
                setTypingUser(null);
            }
        }
        });
    },
            onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        }});
        stompClient.current.activate();
        return () => {
            if (stompClient.current) stompClient.current.deactivate();
        };}, []);

    const onSubmit = (e) => {
        sendMessageSocket(e, selectedChatId, input, setInput, "text", stompClient.current);
    };

    const [typingUser, setTypingUser] = useState(null);
    const typingTimeout = useRef(null);


    const handleTyping = () => {
        if (!stompClient.current || !stompClient.current.connected) {
          return;
        }
        stompClient.current.publish({
            destination: "/app/chat.typing",
            body: JSON.stringify({ 
                chatId: selectedChatId, 
                typing: true
            })
        });

        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            stompClient.current.publish({
                destination: "/app/chat.typing",
                body: JSON.stringify({ 
                    chatId: selectedChatId, 
                    typing: false
                })
            });
        }, 1500);
    };

    const exit = () => {
        clearTimeout(typingTimeout.current);
        stompClient.current.deactivate();
        stompClient.current = null;
        handleBack();
    }

    return(
        <div className="text-white ml-6">  
            <div className='flex items-center gap-6'>
                   <ExitButton getBack={exit}/> 
                
                <h2 className="text-2xl font-semibold mb-4" > {chatMembers.filter((member) => member !== localStorage.getItem("username")).join(' ')}</h2>
            </div> 
            
            <div className="bg-transparent p-4 rounded-t-lg space-y-2 flex flex-col justify-between overflow-y-auto min-h-[500px] max-h-[500px] scrollbar-hide border-2 border-[gray]" ref={containerRef}>
                <ul className="space-y-2 flex-col ">
                    {messagesDTO.messages.map((message, index) => (
                        <Message key={index} type={messagesDTO.types[index]} message={message} time={messagesDTO.times[index]} sender={messagesDTO.senders[index]} />
                    ))}
                </ul>

                {messagesDTO.messages.length === 0 && <Loader />}
                <div className={`text-sm italic text-gray-400  flex mt-2 gap-2 ${!typingUser && 'invisible'}`}>
                        {typingUser} typing...
                </div>
            </div>
            
            <form onSubmit={onSubmit}>
                

                <input placeholder="Type something..." value={input} onChange={(e) => {
                    setInput(e.target.value);
                    handleTyping();
                }} 
                className="placeholder:text-white bg-transparent border-2 border-[gray] outline-none text-lg  w-full p-3 rounded-b-lg"/>
                
                <button  className='hidden'></button>
            </form>
        </div>
    );
}

export default InChat;