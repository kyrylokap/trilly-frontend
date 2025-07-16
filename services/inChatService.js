
import axios from "axios"
import { sendMessageSocket } from "./messageService";

const url = "http://localhost:9999/api/v1/";

export const sendMessage = async (e, selectedChatId, input, setInput, setMessages, type) => {
    if(e){e.preventDefault();}
    try{
        await axios.post(
            `${url}chats/`+ selectedChatId +"/messages",
            {
                "text": input,
                "id": null,
                "type": type
            } ,
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }  
        ); 
        setInput('')
        await getMessages(selectedChatId, setMessages);
    }catch(error){}
}



export const getMessages = async (selectedChatId, setMessages) => {
    try{
        const response = await axios.get(
            `${url}chats/`+ selectedChatId +"/messages",
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
        )
        setMessages(response.data)
        console.log(response.statusText)
    }
    catch(error){}
};


export const sendPost = async (secondUsername, mediaUrl, stompClient) =>{
    let chat
    try{
        chat = await axios.get(`${url}users/getChat`,{
            params:{
                secondUsername: secondUsername
            },
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
              }
          });
        sendMessageSocket(chat.data.chatId, mediaUrl, null,"image",stompClient.current);
    } catch(e){
        console.log(e)
    }
    

}


