import { deleteMessageSocket } from "../../services/messageService";


export default function MessageMenu({setChangingMessage,  message,  setId, setIsChanging, selectedChatId, stompClient}){


    return(
        <div className="absolute text-white bg-[gray] rounded-lg bottom-full z-50">
            <p className="hover:bg-[#3f3f3f] duration-200 p-2 rounded-t-lg cursor-pointer" 
                onClick={() => {
                    deleteMessageSocket(selectedChatId, message.id, stompClient);
                }}> Delete</p>

            <p className="hover:bg-[#3f3f3f] duration-200 p-2 rounded-b-lg cursor-pointer" 
                onClick={() => {
                    if(message.type === 'text'){
                      setChangingMessage(message.message);
                      setId(message.id);
                      setIsChanging(true);
                    }}}>Change</p>
        </div>
    );
}   