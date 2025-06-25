import axios from "axios";
import Aside from "./Aside";
import Posts from "./Posts";
import { useState } from "react";

function Content({username, changeAside, aside, settings, openSettings}){
    const [selectedChat, setSelectedChat] = useState(null);
    const handleBack = () => setSelectedChat(null);

    const [profile, setUserProfile] = useState(null);
    
    const getProfile = async (profileUsername) =>{
        try{
            const response = await axios.get("http://localhost:9999/api/v1/user/" + profileUsername)
            setUserProfile(response.data)
        }catch(e){}
    }

    return(
        <div className="relative">
            <Posts className={``} username={username} changeAside={changeAside} aside={aside} setSelectedChat={setSelectedChat} profile={profile}
                setUserProfile={setUserProfile} getProfile={getProfile}/>
            {aside && (<div className="fixed inset-0  z-50 p-4 md:static md:w-[300px] md:p-0 md:z-auto">
              <Aside username={username} changeAside={changeAside} aside={aside}
                    selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleBack={handleBack}
                    settings={settings} openSettings={openSettings} myProfile={getProfile}/>
            </div>)}
        </div>
        
    );
}

export default Content;