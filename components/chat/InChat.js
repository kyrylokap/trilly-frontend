import Message from './Message'
import { useState, useEffect ,useRef} from "react";
import ExitButton from '../ExitButton';
import {   changeMessageSocket, handleConnect, handleTyping, sendMessageSocket, sendSeenMessages } from '../../services/messageService';
import {   getMessages } from '../../services/inChatService';
import Loader from '../Loader';
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import MessageChangingBlock from './MessageChangingBlock';
function InChat({selectedChatId, handleBack, chatMembers, setChats}){
    const [messagesDTO, setMessages] = useState([]);
    const [input, setInput] = useState('')
    const containerRef = useRef(null);
    const stompClient = useRef(null);

    
    

    useEffect(() => {
        stompClient.current = new Client({
            webSocketFactory: () => new SockJS("http://localhost:9999/ws"),
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            onConnect: () => handleConnect(stompClient, selectedChatId, setMessages, setTypingUser),
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
    useEffect(() => {
        getMessages(selectedChatId, setMessages);
        sendSeenMessages(selectedChatId);
    }, [selectedChatId]);


    

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
        sendSeenMessages(selectedChatId);
    }, [messagesDTO, selectedChatId]);


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
                    {messagesDTO.map((message, index) => (
                        <Message selectedChatId={selectedChatId} stompClient={stompClient} setIsChanging={setIsChanging} setId={setId}
                            setChangingMessage={setChangingMessage}  setInput={setInput} key={index} 
                            message={message}  />
                    ))}
                </ul>

                {messagesDTO.length === 0 && <Loader />}
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