
import Aside from "./Aside";
import Posts from "./Posts";
import { useState } from "react";
import AddPost from "./profile/AddPost";
  import { getUserChats } from "../services/chatService";

function Content({changeAside, aside, settings, openSettings, setUserProfile, profile, newPost, addPost, stompClient}){
    const [selectedChat, setSelectedChat] = useState(null);
    const handleBack = () => {
        setSelectedChat(null);
        getUserChats(setChats);
    }
    const [chats, setChats] = useState([])
      
    

    return(
        <div className="relative">
            {newPost === true && <AddPost newPost={newPost} addPost={addPost} />}
           
            <Posts stompClient={stompClient} changeAside={changeAside} aside={aside} setSelectedChat={setSelectedChat} profile={profile}
                setUserProfile={setUserProfile} newPost={newPost} addPost={addPost}/>
            {aside && (
              <Aside setChats={setChats} chats={chats}  changeAside={changeAside} aside={aside}
                selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleBack={handleBack}
                settings={settings} openSettings={openSettings}/>
            )}
        </div>
    );
}

export default Content;