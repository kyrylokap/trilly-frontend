import Nav from '../Nav'
import Content from '../Content'
import { useState } from 'react';

function Main(){
    const username = "kyrylo";
    const [aside, setAside] = useState(false);

    const changeAside = async (e) => {
        setAside(e)
    }

    const [settings, setSettings] = useState(false);
    const openSettings = (e) =>{
        setSettings(e);
    }

    const [newPost, setAddPost] = useState(false);
    const addPost = (e) => setAddPost(e);
    
    const [profile, setUserProfile] = useState(null);
    return(
        <div className='w-[100vw] h-[100vh] select-none'>
            <Nav addPost={addPost} aside={aside} changeAside={changeAside} username={username} openSettings={openSettings} settings={settings} setUserProfile={setUserProfile} />
            <Content addPost={addPost} newPost={newPost} aside={aside} changeAside={changeAside} username={username} openSettings={openSettings} settings={settings} profile={profile} setUserProfile={setUserProfile}/>
        </div>
    );
}

export default Main;