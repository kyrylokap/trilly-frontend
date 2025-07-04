
import Aside from "./Aside";
import Posts from "./Posts";
import { useState } from "react";
import AddPost from "./profile/AddPost";

function Content({changeAside, aside, settings, openSettings, setUserProfile, profile, newPost, addPost}){
    const [selectedChat, setSelectedChat] = useState(null);
    const handleBack = () => setSelectedChat(null);


    return(
        <div className="relative">
            {newPost === true && <AddPost newPost={newPost} addPost={addPost} />}
           
            <Posts  changeAside={changeAside} aside={aside} setSelectedChat={setSelectedChat} profile={profile}
                setUserProfile={setUserProfile} newPost={newPost} addPost={addPost}/>
            {aside && (
              <Aside  changeAside={changeAside} aside={aside}
                selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleBack={handleBack}
                settings={settings} openSettings={openSettings}/>
            )}
        </div>
    );
}

export default Content;