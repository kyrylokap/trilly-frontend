import SettingsButton from "./settings/SettingsButton";
import ChatsButton from "./profile/ChatsButton";

function Nav({changeAside, aside, username, openSettings}){
    return(
        <nav className="h-[15vh] bg-[#0c0c0f] flex items-center justify-between">
            <h1 className="text-8xl font-bold m-3 text-white">Trilly</h1>
            <div className="flex items-center mr-8" onClick={changeAside}>
                <SettingsButton username={username} openSettings={openSettings}/>
                <ChatsButton changeAside={changeAside} aside={aside}/>
            </div>
        </nav>
    );
}

export default Nav;