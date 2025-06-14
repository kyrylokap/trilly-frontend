import Aside from "./Aside";
import Posts from "./Posts";

function Content({username, changeAside, aside}){

    return(
        <div className=" relative">
            <Posts className={``} username={username} changeAside={changeAside} aside={aside}/>
            {aside && <Aside username={username} changeAside={changeAside}/>}
        </div>
        
    );
}

export default Content;