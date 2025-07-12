import SettingsButton from "./settings/SettingsButton";
import ChatsButton from "./profile/buttons/ChatsButton";
import PostAddButton from "./profile/buttons/PostAddButton";
import MyProfileButton from "./profile/buttons/MyProfileButton";
import NotificationButton from "./profile/buttons/NotificationButton";

function Nav({changeAside, aside, openSettings, setUserProfile, settings, addPost, showNotificationBlock}){
    return(
        <nav className="h-[15vh] bg-[#0c0c0f] flex items-center justify-between">
            <h1 className="text-[5vw] font-bold m-3 text-white">Trilly</h1>
                <div className="flex items-center lg:gap-3  gap-8">
                    <NotificationButton showNotificationBlock={showNotificationBlock}/>
                    <MyProfileButton setUserProfile={setUserProfile} />
                    <PostAddButton  addPost={addPost} />
                    <div className="flex items-center mr-8 lg:gap-3  gap-8" onClick={changeAside}>
                        <SettingsButton openSettings={openSettings}  settings={settings}/>
                        <ChatsButton changeAside={changeAside} aside={aside} openSettings={openSettings}/>
                    </div>
            </div>
        </nav>
    );
}

export default Nav;