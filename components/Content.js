import Aside from "./Aside";
import Posts from "./Posts";
import { useState } from "react";

function Content({username, changeAside, aside}){
    const [selectedChat, setSelectedChat] = useState(null);
    const handleBack = () => setSelectedChat(null);

    return(
        <div className="relative ">
            <Posts  className={``} username={username} changeAside={changeAside} aside={aside} setSelectedChat={setSelectedChat}/>
            {aside && (<div className="fixed inset-0  z-50 p-4 md:static md:w-[300px] md:p-0 md:z-auto">
              <Aside username={username} changeAside={changeAside} aside={aside}
                    selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleBack={handleBack}/>
            </div>)}
        </div>
        
    );
}

export default Content;