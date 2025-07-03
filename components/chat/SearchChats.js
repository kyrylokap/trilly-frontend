

export default function SearchChats({searchedChats, setSelectedChat, setSerchedChats}){
    const selectChat = (chat) => {
        setSelectedChat(chat);
        setSerchedChats([]);
    }

    return(
        <ul className={` top-full left-1/4 z-10 max-h-60 overflow-y-auto w-1/2 absolute backdrop-blur}`}>
            {searchedChats !== null && searchedChats.map((chat) => {
                return(
                    <li key={chat.id} className="bg-[#2a2a2e] p-2 hover:bg-black duration-300 border mb-2  cursor-pointer" onClick={(e) => selectChat(chat)}>
                        <ul className="flex gap-3">
                            {chat.usernames.map((username) => {
                                return(
                                    <li className="text-white">
                                       { localStorage.getItem('username') !== username && <p>{username}</p>}
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}