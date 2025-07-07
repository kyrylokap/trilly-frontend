import { useState } from "react";
import { getProfile, loadUsers } from "../services/userProfileService";
import Loader from "./Loader";
function Search({setUserProfile}){
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        getProfile(inputValue, setUserProfile);
        setInputValue("")
        setUsers([])
    }

    const [users, setUsers] = useState([]);

    

    return(
        <form className="flex sticky top-0 justify-center items-center z-20 w-full " onSubmit={handleSubmit} >
              <div className="relative w-[50%] flex flex-col items-center">
                <div className="w-full relative">
                  <input placeholder="Search someone..." value={inputValue} onChange={(e) => loadUsers(e.target.value, setUsers, setUserProfile, setInputValue, localStorage.getItem("username"))}
                        className="border-[#2a2a2e] backdrop-blur bg-inherit outline-none p-3 border-2 w-full text-white placeholder:text-white font-thin pr-10"/>
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" disabled={users === null}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-white hover:text-[gray] duration-300" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </button>
                </div>
                
                {users.length === 0 && inputValue.length > 0 &&
                <div className="relative">
                  <div className="absolute">
                    <Loader />
                  </div>
                </div>
                
                  
                }
                {users.length !== 0 &&
                  <ul className="absolute top-full left-0 z-10 max-h-60 overflow-y-auto w-full flex flex-col rounded-b-md backdrop-blur border-2 border-[#2a2a2e]">
                    {users.map((user) => (
                      <li key={user.username} onClick={() => {
                          getProfile(user.username, setUserProfile);
                          setUsers([]);
                          setInputValue("");
                        }} className="font-thin text-white pl-3 p-2 cursor-pointer hover:bg-[#333] duration-300">
                        {user.username}
                      </li>
                    ))}
                  </ul>
                }
              </div>
            </form>
    );
}

export default Search;