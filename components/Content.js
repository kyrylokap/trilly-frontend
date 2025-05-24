import Aside from "./Aside";
import Posts from "./Posts";
import Nav from "./Nav";

function Content(){
    return(
        <div className="flex">
            <Posts />
            <Aside />   
        </div>
        
    );
}

export default Content;