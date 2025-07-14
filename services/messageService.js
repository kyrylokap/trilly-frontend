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
            if (message.chatId === selectedChatId) {
                setMessages(prev => [
                    ...prev,
                    {
                        message: message.text,
                        time: message.time,
                        sender: message.sender,
                        type: message.type,
                        id: message.id
                    }
                ]);
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
                    return prev.map(m => 
                        m.id === message.id
                        ? { ...m, message: message.text, time: message.time }
                        : m
                    );
                });
            }
        });

        stompClient.current.subscribe("/topic/delete", (msg) => {
            const message = JSON.parse(msg.body);
            if (message.chatId === selectedChatId) {
                setMessages(prev => prev.filter(m => m.id !== message.id));
            }
        });
}

export const sendSeenMessages = async (chatId) => {
    try{
        await axios.put(`http://localhost:9999/api/v1/chats/markSeen`, null,{
            params:{
                chatId: chatId
            },
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        });
    }
    catch(e){}
};


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