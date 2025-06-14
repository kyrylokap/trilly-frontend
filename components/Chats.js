

function Chats({chats, setSelectedChat, username}){
    return(
        <ul className="ml-2 border-t-[1px]">
          {chats.map((chat) => (
            <li key={chat.chatId} className="flex items-center p-4 cursor-pointer border-b-[1px] border-white"
              onClick={() => setSelectedChat(chat)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="min-w-[44px] h-[44px]" fill="white"viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fillRule="evenodd"d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
              <div className="text-white flex flex-col ml-3 text-left">
                <div>
                  {chat.usernames.filter((name) => name !== username).map((name, index) => (
                  <p className="font-semibold text-gray-500 text-lg" key={index}>{name}</p>
                ))}
                </div>
                <p>{chat.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
    );
}

export default Chats;