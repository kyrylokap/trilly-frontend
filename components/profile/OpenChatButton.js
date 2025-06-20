import axios from "axios";


function OpenChatButton({username, profileUsername, setSelectedChat, changeAside}){
    const openChat = async () =>{
        try{
            const response = await axios.get("http://localhost:9999/api/v1/users/getChat", {
                params:{
                    firstUsername: username,
                    secondUsername: profileUsername
                }
            });
            setSelectedChat(response.data);
            changeAside(true);
        }
        catch(e){}
    }

    return(
        <button onClick={openChat}
        className={`flex text-center text-black  bg-white text-xl  tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500 ${username === profileUsername && `hidden`}`}>
            Open chat
        </button>
    );
}

export default OpenChatButton;