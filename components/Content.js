
import Aside from "./Aside";
import Posts from "./Posts";
import { useState } from "react";

function Content({username, changeAside, aside, settings, openSettings}){
    const [selectedChat, setSelectedChat] = useState(null);
    const handleBack = () => setSelectedChat(null);

    const [profile, setUserProfile] = useState(null);
    
    

    return(
        <div className="relative">
            <Posts className={``} username={username} changeAside={changeAside} aside={aside} setSelectedChat={setSelectedChat} profile={profile}
                setUserProfile={setUserProfile}/>
            {aside && (<div className="fixed inset-0  z-50 p-4 md:static md:w-[300px] md:p-0 md:z-auto">
              <Aside username={username} changeAside={changeAside} aside={aside}
                    selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleBack={handleBack}
                    settings={settings} openSettings={openSettings} setUserProfile={setUserProfile}/>
            </div>)}
        </div>
        
    );
}

export default Content;