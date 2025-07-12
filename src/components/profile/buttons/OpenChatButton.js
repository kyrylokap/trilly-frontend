import { openChat } from "../../../services/chatService";


function OpenChatButton({profileUsername, setSelectedChat, changeAside}){
    return(
        <button onClick={() => openChat(profileUsername, setSelectedChat, changeAside)}
        className={`flex text-center text-black  bg-white text-xl  tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500 
            ${localStorage.getItem("username") === profileUsername && `hidden`}`}>
            Open chat
        </button>
    );
}

export default OpenChatButton;