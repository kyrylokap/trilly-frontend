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