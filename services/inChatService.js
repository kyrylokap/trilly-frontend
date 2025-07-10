
import { Client } from "@stomp/stompjs";
import axios from "axios"

const url = "http://localhost:9999/api/v1/";

export const sendMessage = async (e, selectedChatId, input, setInput, setMessages, type) => {
    e.preventDefault();
    try{
        await axios.post(
            `${url}chats/`+ selectedChatId +"/messages",
            {
                "text": input,
                "id": null,
                "type": type
            } ,
                {headers: {
                    Authorization: 'Bea rer ' + localStorage.getItem('token')
                    }
                }  
        ); 
        setInput('')
        await getMessages(selectedChatId, setMessages);
    }catch(error){}
}

export const sendMessageSocket = (e, selectedChatId, input, setInput, type, stompClient) => {
    e.preventDefault();
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat.send",
            body: JSON.stringify({
                chatId: selectedChatId,
                text: input,
                type: type/*,
                token: "Bearer " + localStorage.getItem("token")*/
            })
        });
        setInput("");
    } else {
        console.error("STOMP client not subcribe");
    }
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


export const sendPost = async (secondUsername, mediaUrl) =>{
    try{
        const chat = await axios.get(`${url}users/getChat`,{
            params:{
                secondUsername: secondUsername
            },
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
              }
          });
        console.log(chat);
        await axios.post(`${url}chats/${chat.data.chatId}/messages`, {
        text: mediaUrl,
        id: null,
        type: "image"
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }); 
    } catch(e){}
}