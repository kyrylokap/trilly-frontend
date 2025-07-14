import axios from 'axios';

export const changeMessage = async (input, messageId, chatId) => {
    try{
        axios.put(`http://localhost:9999/api/v1/chats/${chatId}/messages`,{
            text:input,
            id: messageId
        },
        {headers:{
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }});
    }catch(e){
        console.log("Failed to change message!");
    }
}

export const changeMessageSocket = async (e, input, messageId, chatId, stompClient) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat.change",
            body: JSON.stringify({
                chatId: chatId,
                text: input,
                id: messageId
            })
        });
    } else {
        console.error("STOMP client not subcribe");
    }
}

export const handleTyping = (e, setInput, stompClient, selectedChatId, typingTimeout) => {
    setInput(e.target.value);
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

export const sendMessageSocket = (selectedChatId, input, setInput, type, stompClient) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat.send",
            body: JSON.stringify({
                chatId: selectedChatId,
                text: input,
                type: type
            })
        });
        setInput("");
    } else {
        console.error("STOMP client not subcribe");
    }
}

export const handleConnect = (stompClient, selectedChatId, setMessages, setTypingUser) => {
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
        }});

        stompClient.current.subscribe("/topic/delete", (msg) => {
            const message = JSON.parse(msg.body);
            if (message.chatId === selectedChatId) {
                setMessages(prev => {
                    const newMessages = [...prev.messages];
                    const index = prev.ids.findIndex(id => id === message.id);
                
                    if (index !== -1) {
                        newMessages.splice(index, 1);
                        return {
                            ...prev,
                            messages: newMessages,
                            times: [...prev.times.slice(0, index), ...prev.times.slice(index + 1)],
                            senders: [...prev.senders.slice(0, index), ...prev.senders.slice(index + 1)],
                            types: [...prev.types.slice(0, index), ...prev.types.slice(index + 1)],
                            ids: [...prev.ids.slice(0, index), ...prev.ids.slice(index + 1)]
                        };
                    }
                    return prev;
                });
            }
        });
}

export const deleteMessageSocket = (selectedChatId, messageId, stompClient) => {
    
    if (stompClient.current && stompClient.current.connected) {
        stompClient.current.publish({
            destination: "/app/chat.delete",
            body: JSON.stringify({
                chatId: selectedChatId,
                id: messageId
            })
        });
    } else {
        console.error("STOMP client not subcribe");
    }
}