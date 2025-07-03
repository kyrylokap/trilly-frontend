import SettingsButton from "./settings/SettingsButton";
import ChatsButton from "./profile/buttons/ChatsButton";
import PostAddButton from "./profile/buttons/PostAddButton";
import MyProfileButton from "./profile/buttons/MyProfileButton";
import { sendPos } from "../services/positionService";

function Nav({changeAside, aside, openSettings, setUserProfile, settings, addPost}){
    return(
        <nav className="h-[15vh] bg-[#0c0c0f] flex items-center justify-between">
            <h1 className="text-[5vw] font-bold m-3 text-white">Trilly</h1>
                <div className="flex items-center gap-3">
                    <p className="text-white cursor-pointer" onClick={sendPos}>Send pos</p>
                    <MyProfileButton setUserProfile={setUserProfile} />
                    <PostAddButton  addPost={addPost} />
                    <div className="flex items-center mr-8 gap-3" onClick={changeAside}>
                        <SettingsButton openSettings={openSettings} changeAside={changeAside} settings={settings}/>
                        <ChatsButton changeAside={changeAside} aside={aside} openSettings={openSettings}/>
                    </div>
            </div>
        </nav>
    );
}

export default Nav;