import Nav from '../Nav'
import Content from '../Content'
import { useState } from 'react';

function Main(){
    const username = "kyrylo"
    const [aside, setAside] = useState(false);

    const changeAside = async (e) => {
        setAside(e)
    }
    return(
        <div className='w-[100vw] h-[100vh] select-none'>
            <Nav aside={aside} changeAside={changeAside}/>
            <Content username={username} aside={aside} changeAside={changeAside} />
        </div>
    );
}

export default Main;