
import Aside from "./Aside";
import Posts from "./Posts";
import { useState } from "react";

function Content({username, changeAside, aside, settings, openSettings, setUserProfile, profile}){
    const [selectedChat, setSelectedChat] = useState(null);
    const handleBack = () => setSelectedChat(null);

    
    

    return(
        <div className="relative">
            <Posts username={username} changeAside={changeAside} aside={aside} setSelectedChat={setSelectedChat} profile={profile}
                setUserProfile={setUserProfile}/>
            {aside && (
              <Aside username={username} changeAside={changeAside} aside={aside}
                selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleBack={handleBack}
                settings={settings} openSettings={openSettings}/>
            )}
        </div>
    );
}

export default Content;