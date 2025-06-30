
import axios from "axios"

const url = "http://localhost:9999/api/v1/";

export const sendMessage = async (e, selectedChatId, input, username, setInput, setMessages, type) => {
    e.preventDefault();
    try{
        await axios.post(
            `${url}chats/`+ selectedChatId +"/messages",
            {
                "text": input,
                "sender": username,
                "id": null,
                "type": type
            }   
        ); 
        setInput('')
        getMessages(selectedChatId, setMessages)
    }catch(error){}
}

export const getMessages = async (selectedChatId, setMessages) => {
    try{
        const response = await axios.get(
            `${url}chats/`+ selectedChatId +"/messages"
        )
        setMessages(response.data)
        console.log(response.statusText)
    }
    catch(error){}
};


//const url = "http://localhost:9999/api/v1/users/getChat";
export const sendPost = async (firstUsername, secondUsername, mediaUrl) =>{
    try{
        const chat = await axios.get(`${url}users/getChat`,{
            params:{
                firstUsername: firstUsername,
                secondUsername: secondUsername
            }
        });
        console.log(chat);
        await axios.post(`${url}chats/${chat.data.chatId}/messages`,
            {
                "text": mediaUrl,
                "sender": firstUsername,
                "id": null,
                "type": "image"
            }   
        ); 
    } catch(e){}
}