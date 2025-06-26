import { useState, useEffect } from "react";
import Chats from "./chat/Chats";
import axios from 'axios'
import { motion } from "framer-motion";
import ExitButton from "./ExitButton";
import Settings from "./settings/Settings";
function Aside({username, changeAside, aside, handleBack, 
      setSelectedChat, selectedChat, settings, openSettings, setUserProfile}){
  

    const [chats, setChats] = useState([])
    const getUserChats = async () => {
        try{
            const response = await axios.get(
                "http://localhost:9999/api/v1/users/"+ username + "/chats"
            )
            setChats(response.data)
            console.log(response.data)
        }
        catch(error){}
    };

    useEffect(() =>{
        getUserChats();
    },[username])

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
      <div className="scrollbar-hide  right-0 fixed top-0 bottom-0 z-20 backdrop-blur-md p-4 overflow-auto w-screen border-2 border-[#2a2a2e] md:absolute md:right-0 md:top-0 md:h-[85vh] md:w-[40vw] md:min-w-[220px]">
        <motion.div
          key="aside"
          initial={{ x: 200, y: 0, opacity: 0 }}
          animate={{ x: 0,y: 0, opacity: 1 }}
          exit={{ x: 100,y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}>

        <ExitButton getBack={settings === false ? (e) => changeAside(false) : openSettings}/>
        {settings === false ? 
          <Chats getSearchedChats={getSearchedChats} username={username} setSelectedChat={setSelectedChat} setSearchedChats={setSearchedChats} 
                            searchedChats={searchedChats} selectedChat={selectedChat} chats={chats} handleBack={handleBack} refreshChats={getUserChats}/> : 
          <Settings username={username} setUserProfile={setUserProfile}/>
        }
        </motion.div>
      </div>
  );
} 

export default Aside;