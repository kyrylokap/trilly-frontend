import ChatsList from "./ChatsList";
import InChat from "./InChat";
import SearchChats from "./SearchChats";
import { getSearchedChats } from "../../services/chatService";
import { useState } from "react";
import Loader from "../Loader";


export default function Chats({  setSelectedChat, setSearchedChats, 
                            searchedChats, selectedChat, chats, handleBack}){
                                

    const [searchVal, setSearchedVal] = useState('');


    return(
        <div>
          <p className="text-white font-semibold text-4xl pt-2 text-center">
          My chats
        </p>
        <div className="flex flex-rpw items-center justify-center relative">
          <input onChange={(e) => {
            getSearchedChats(e.target.value, setSearchedChats);
            setSearchedVal(e.target.value);
          }}
            placeholder="Search in your chats..."
            className="border-b-2 m-4 p-2 pl-4 outline-none placeholder-white w-[70%] bg-transparent text-white font-thin placeholder:font-thin"/>
            {searchedChats.length === 0 && searchVal.length > 0 && 
            <div className="relative">
              <div className="absolute">
                <Loader />
              </div>
            </div>
            
            
            }
            <SearchChats setSearchedVal={setSearchedVal} searchedChats={searchedChats}  setSelectedChat={setSelectedChat} setSerchedChats={setSearchedChats}/>
        </div>

        
        {selectedChat === null ? 
          (<ChatsList chats={chats} setSelectedChat={setSelectedChat} />): 
          (<InChat selectedChatId={selectedChat.chatId} handleBack={handleBack}  chatMembers={selectedChat.usernames} />)
        }
        </div>
    );
}