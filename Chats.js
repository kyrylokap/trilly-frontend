import ChatsList from "./components/ChatsList";
import InChat from "./components/chat/InChat";
import SearchChats from "./components/chat/SearchChats";

export default function Chats({getSearchedChats, username, setSelectedChat, setSearchedChats, 
                            searchedChats, selectedChat, chats, handleBack}){
                                
    return(
        <div>
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
          (<ChatsList chats={chats} setSelectedChat={setSelectedChat} usernamme={username}/>): 
          (<InChat selectedChatId={selectedChat.chatId} handleBack={handleBack} username={username} chatMembers={selectedChat.usernames}/>)
        }
        </div>
    );
}