import Nav from '../Nav'
import Content from '../Content'
import { useState } from 'react';

function Main(){
    const username = "kyrylo"
    const [aside, setAside] = useState(false);

    const changeAside = async (e) => {
        setAside(e)
    }

    const [settings, setSettings] = useState(false);
    const openSettings = () =>{
        setSettings(!settings);
    }

    return(
        <div className='w-[100vw] h-[100vh] select-none'>
            <Nav aside={aside} changeAside={changeAside} username={username} openSettings={openSettings} settings={settings}/>
            <Content username={username} aside={aside} changeAside={changeAside} openSettings={openSettings} settings={settings}/>
        </div>
    );
}

export default Main;