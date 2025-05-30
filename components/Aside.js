import { useState, useEffect } from "react";
import Chats from "./Chats"
import InChat from "./chat/InChat";
import axios from 'axios'
function Aside(){
    const [chats, setChats] = useState([])
    let username = "kyrylo"
    const getUserChats = async () => {
        try{
            const response = await axios.get(
                "http://localhost:9999/api/v1/users/"+ username +"/chats"
            )
            setChats(response.data)
            console.log(response.data)
        }
        catch(error){}
    };

    
    const [selectedChat, setSelectedChat] = useState(null);
    const handleBack = () => setSelectedChat(null);

    useEffect(() =>{
        getUserChats();
    })
  return (
    <div className="w-[40vw] bg-[#2a2a2e] h-[80vh] overflow-auto scrollbar-hide p-4">
      <p className="text-white font-semibold text-4xl pt-2 text-center">
        Your chats
      </p>
      <div className="flex flex-row items-center justify-center">
        <input
          placeholder="Search someone..."
          className="rounded-2xl m-4 p-2 pl-4 outline-none placeholder-black w-[70%] bg-[#808080] text-black font-semibold placeholder:font-semibold"
        />
      </div>
      {selectedChat === null ? 
        (<Chats chats={chats} setSelectedChat={setSelectedChat} username={username}/>): 
        (<InChat selectedChatId={selectedChat.chatId} handleBack={handleBack}/>)
      }
    </div>
    );
}

export default Aside;