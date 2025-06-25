
import axios from "axios"

const url = "http://localhost:9999/api/v1/";

export const sendMessage = async (e, selectedChatId, input, username, setInput, setMessages) => {
    e.preventDefault();
    try{
        await axios.post(
            `${url}chats/`+ selectedChatId +"/messages",
            {
                "text": input,
                "sender": username,
                "id": null
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