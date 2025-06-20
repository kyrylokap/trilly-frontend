import { useState, useEffect } from "react";
import Chats from "./Chats"
import InChat from "./chat/InChat";
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion";
import SearchChats from "./chat/SearchChats";
import ExitButton from "./ExitButton";
function Aside({username, changeAside, aside, handleBack, setSelectedChat, selectedChat}){
  

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

    
   

    useEffect(() =>{
        getUserChats();
    })

    const [searchedChats, setSearchedChats] = useState([]);

    const getSearchedChats = async (e) => {
        try{
            if(e === ""){
              setSearchedChats([]);
            }else{
              const response = await axios.get(`http://localhost:9999/api/v1/chats/${username}/${e}`);
            setSearchedChats(response.data);
            }
            
        }
        catch (e){}
    }
    
  return (
    <div className="scrollbar-hide  right-0 fixed top-0 bottom-0 z-50 backdrop-blur-md p-4 overflow-auto w-screen border-2 border-[#2a2a2e] md:absolute md:right-0 md:top-0 md:h-[85vh] md:w-[40vw] md:min-w-[220px]">
      <motion.div
        key="aside"
        initial={{ x: 200, y: 0, opacity: 0 }}
        animate={{ x: 0,y: 0, opacity: 1 }}
        exit={{ x: 100,y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}>

      <ExitButton getBack={(e) => changeAside(false)}/>

      <p className="text-white font-semibold text-4xl pt-2 text-center">
        My chats
      </p>

      <div className="flex flex-col items-center justify-center relative">
        <input onChange={(e) => getSearchedChats(e.target.value)}
          placeholder="Search in your chats..."
          className="border-b-2 m-4 p-2 pl-4 outline-none placeholder-white w-[70%] bg-transparent text-white font-thin placeholder:font-thin"/>
        <SearchChats searchedChats={searchedChats} myUsername={username} setSelectedChat={setSelectedChat} setSerchedChats={setSearchedChats}/>
      </div>

      {selectedChat === null ? 
        (<Chats chats={chats} setSelectedChat={setSelectedChat} usernamme={username}/>): 
        (<InChat selectedChatId={selectedChat.chatId} handleBack={handleBack} username={username} chatMembers={selectedChat.usernames}/>)
      }
      </motion.div>
    </div>
    );
}

export default Aside;