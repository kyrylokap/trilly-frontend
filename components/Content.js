import Aside from "./Aside";
import Posts from "./Posts";
import Nav from "./Nav";

function Content({username}){
    return(
        <div className="flex">
            <Posts username={username}/>
            <Aside username={username}/>   
        </div>
        
    );
}

export default Content;