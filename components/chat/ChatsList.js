import UserSvg from "../UserSvg";


function ChatsList({chats, setSelectedChat}){
    return(
        <ul className="ml-2 border-t">
          {chats.map((chat) => (
            <li key={chat.chatId} className="flex items-center p-4 cursor-pointer border-b border-white group"
              onClick={() => setSelectedChat(chat)}>
              <UserSvg style={`text-[gray] group-hover:text-white  duration-500`}/>
              <div className="text-white flex flex-col ml-3 text-left ">
                <div className="flex gap-2 ">
                  {chat.usernames.filter((name) => name !== localStorage.getItem("username")).map((name, index) => {
                    return(<p className="font-semibold text-gray-500 text-lg group-hover:text-white  duration-500" key={index}>{index !== 0 ? `,` : ` `}{name}</p>);
                  })}
                </div>
                <p>{chat.lastMessageType === "image" ? "Some post" : chat.lastMessage}</p>
              </div>
              
            </li>
          ))}
        </ul>
    );
}

export default ChatsList;