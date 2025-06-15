import Aside from "./Aside";
import Posts from "./Posts";

function Content({username, changeAside, aside}){

    return(
        <div className="relative ">
            <Posts className={``} username={username} changeAside={changeAside} aside={aside}/>
            {aside && (
  <div className="fixed inset-0  z-50 p-4 md:static md:w-[300px] md:p-0 md:z-auto">
    <Aside username={username} changeAside={changeAside} />
  </div>
)}
        </div>
        
    );
}

export default Content;