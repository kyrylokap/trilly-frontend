import { useState, useEffect } from "react";
import Chats from "./chat/Chats";
import { motion } from "framer-motion";
import ExitButton from "./ExitButton";
import Settings from "./settings/Settings";
import { getUserChats } from "../services/chatService";

function Aside({username, changeAside, aside, handleBack, 
      setSelectedChat, selectedChat, settings, openSettings}){
  

    const [chats, setChats] = useState([])
    const [searchedChats, setSearchedChats] = useState([]);
    
    useEffect(() =>{
        getUserChats(setChats);
    },[username])

    

    
    return (
      <div className="fixed inset-0 z-50 p-4 md:static md:w-[300px] md:p-0 md:z-auto">
        <div className="scrollbar-hide  right-0 fixed top-0 bottom-0 z-20 backdrop-blur-md p-4 overflow-auto w-screen border-2 border-[#2a2a2e] md:absolute md:right-0 md:top-0 md:h-[85vh] md:w-[40vw] md:min-w-[220px]">
          <motion.div
            key="aside"
            initial={{ x: 200, y: 0, opacity: 0 }}
            animate={{ x: 0,y: 0, opacity: 1 }}
            exit={{ x: 100,y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            
          <ExitButton getBack={() => {
            if (!settings) {
              changeAside(false);
            } else {
              changeAside(false);
              openSettings(false);
            }
          }}/>
          {settings === false ? 
            <Chats  username={username} setSelectedChat={setSelectedChat} setSearchedChats={setSearchedChats} 
                              searchedChats={searchedChats} selectedChat={selectedChat} chats={chats} handleBack={handleBack} /> : 
            <Settings username={username} />
          }
          </motion.div>
        </div>
      </div>
  );
} 

export default Aside;