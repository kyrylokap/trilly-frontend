import Message from './Message'
import { useState, useEffect ,useRef} from "react";
import ExitButton from '../ExitButton';
import {   changeMessageSocket, handleTyping, sendMessageSocket } from '../../services/messageService';
import {   getMessages } from '../../services/inChatService';
import Loader from '../Loader';
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { changeMessage } from '../../services/messageService';
import MessageChangingBlock from './MessageChangingBlock';
function InChat({selectedChatId, handleBack, chatMembers, setChats}){
    const [messagesDTO, setMessages] = useState({ messages: [], times: [], senders:[], types: [], ids: []})
    const [input, setInput] = useState('')
    const containerRef = useRef(null);
    const stompClient = useRef(null);

    useEffect(() => {
        getMessages(selectedChatId, setMessages);
    }, [selectedChatId])

    

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
                    types: [...prev.types, message.type],
                    ids: [...prev.ids, message.id]
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
            stompClient.current.subscribe("/topic/change", (msg) => {
            const message = JSON.parse(msg.body);
            if (message.chatId === selectedChatId) {
                setMessages(prev => {
                    const newMessages = [...prev.messages];
                    const index = prev.ids.findIndex(mId => mId === message.id);
                
                    if (index !== -1) {
                        newMessages[index] = message.text;
                    
                        return {
                            ...prev,
                            messages: newMessages,
                            times: [...prev.times.slice(0, index), message.time, ...prev.times.slice(index + 1)],
                            senders: prev.senders,
                            types: prev.types,
                            ids: prev.ids
                        };
                    }
                
                    return prev;
                });
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
        };}, [selectedChatId]);

    const send = () => {
        sendMessageSocket(selectedChatId, input, setInput, "text", stompClient.current);
    };

    const [typingUser, setTypingUser] = useState(null);
    const typingTimeout = useRef(null);



    const exit = () => {
        clearTimeout(typingTimeout.current);
        stompClient.current.deactivate();
        stompClient.current = null;
        handleBack();
    }

    

    const [changingMessage, setChangingMessage] = useState('');
    const [isChanging, setIsChanging] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        setInput(changingMessage);
    },[changingMessage, id]);
    
    const submit = (e) => {
        e.preventDefault()
        if(changingMessage === ''){
            input !== '' && send();
        }else if(input !== ''){
            changeMessageSocket(e, input, id, selectedChatId, stompClient.current);
            setChangingMessage('');
            setIsChanging(false);
        }
    };

    useEffect(() => {
        const el = containerRef.current;
        if(el){
           el.scrollTop = el.scrollHeight;
        }
    }, [messagesDTO, changingMessage]);

    return(
        <div className="text-white ml-6 overflow-y-visible">  
            <div className='flex items-center gap-6'>
                <ExitButton getBack={exit}/> 
                
                <h2 className="text-2xl font-semibold mb-4" > {chatMembers.filter((member) => member !== localStorage.getItem("username")).join(' ')}</h2>
            </div> 
            
            <div className="bg-transparent p-4 rounded-t-lg space-y-2 flex flex-col justify-between overflow-y-auto min-h-[500px] max-h-[500px] scrollbar-hide border-2 border-[gray]" ref={containerRef}>
                <ul className="space-y-2 flex-col ">
                    {messagesDTO.messages.map((message, index) => (
                        <Message setIsChanging={setIsChanging} setId={setId} id={messagesDTO.ids[index]} setChangingMessage={setChangingMessage}  setInput={setInput} key={index} type={messagesDTO.types[index]} message={message} time={messagesDTO.times[index]} sender={messagesDTO.senders[index]} />
                    ))}
                </ul>

                {messagesDTO.messages.length === 0 && <Loader />}
                <div className={`text-sm italic text-gray-400  flex mt-2 gap-2 ${!typingUser && 'invisible'}`}>
                        {typingUser} typing...
                </div>
                
                {isChanging && <MessageChangingBlock setId={setId} setChangingMessage={setChangingMessage} setIsChanging={setIsChanging} changingMessage={changingMessage} 
                    setInput={setInput}/>}

            </div>
            
            <form onSubmit={submit}>

                <input placeholder="Type something..." value={input} onChange={(e) => handleTyping(e, setInput, stompClient, selectedChatId, typingTimeout)} 
                className="placeholder:text-white bg-transparent border-2 border-[gray] outline-none text-lg  w-full p-3 rounded-b-lg"/>
                
                <button className='hidden'></button>
            </form>
        </div>
    );
}

export default InChat;