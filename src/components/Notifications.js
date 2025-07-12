
import ExitButton from "./ExitButton";
export default function Notifications({showNotificationBlock, notifications }){
    
    const exit = () => {
        showNotificationBlock(false);
    }
    

    return(
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-start items-center z-50 flex-col">
        <div className="bg-[#2a2a2e] rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col backdrop-blur-xl rounded-lg h-full w-full p-2 ">
                <div className="flex flex-row gap-4 items-center border-b-2 ">
                   <ExitButton getBack={exit} />
                   <p className="text-white text-2xl text-center ">Notifications</p>
                </div>
                
                <ul className="p-4 gap-6 flex flex-col text-white">
                    {notifications.map((notification) => {
                        return (<li className="flex gap-2 border-b-2 border-[gray]">
                            <p>{notification.time}</p>
                            <p>{notification.text}</p>
                        </li>);
                    })}
                </ul>
            </div>
        </div>
    </div>

        
    );
}