import SettingsButton from "./settings/SettingsButton";
import ChatsButton from "./profile/ChatsButton";
import PostAddButton from "./profile/PostAddButton";
import MyProfileButton from "./profile/MyProfileButton";

function Nav({changeAside, aside, username, openSettings, setUserProfile, settings}){
    return(
        <nav className="h-[15vh] bg-[#0c0c0f] flex items-center justify-between">
            <h1 className="text-[5vw] font-bold m-3 text-white">Trilly</h1>
                <div className="flex items-center gap-3">
                    <MyProfileButton setUserProfile={setUserProfile} username={username}/>
                    <PostAddButton username={username}/>
                    <div className="flex items-center mr-8 gap-3" onClick={changeAside}>
                        <SettingsButton openSettings={openSettings} changeAside={changeAside} settings={settings}/>
                        <ChatsButton changeAside={changeAside} aside={aside} openSettings={openSettings}/>
                    </div>
                    
            </div>
            
        </nav>
    );
}

export default Nav;