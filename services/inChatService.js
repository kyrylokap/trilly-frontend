
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
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }  
        ); 
        setInput('')
        await getMessages(selectedChatId, setMessages)
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


//const url = "http://localhost:9999/api/v1/users/getChat";
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