import { useState, useEffect } from "react";
import Chats from "./Chats"
import InChat from "./chat/InChat";
import axios from 'axios'

function Aside({username, changeAside}){

    const [chats, setChats] = useState([])
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
    <div className="w-[40vw] bg-[#2a2a2e] h-[85vh] overflow-auto scrollbar-hide p-4">
      <div onClick={(e) => changeAside(false)} className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
      </div>
      
      <p className="text-white font-semibold text-4xl pt-2 text-center">
        My chats
      </p>
      <div className="flex flex-row items-center justify-center">
        <input
          placeholder="Search someone..."
          className="rounded-2xl m-4 p-2 pl-4 outline-none placeholder-black w-[70%] bg-[#808080] text-black font-thin placeholder:font-thin"
        />
      </div>
      {selectedChat === null ? 
        (<Chats chats={chats} setSelectedChat={setSelectedChat} username={username}/>): 
        (<InChat selectedChatId={selectedChat.chatId} handleBack={handleBack} username={username} chatMembers={selectedChat.usernames}/>)
      }
    </div>
    );
}

export default Aside;