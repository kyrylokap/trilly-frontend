import axios from "axios";
import { useState } from "react";

function Search({getProfile, setUserProfile}){
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        getProfile(inputValue);
        setInputValue("")
    }

    const [users, setUsers] = useState([]);

    const loadUsers = async (username) => {
        try{
            if(username === ''){
                setUsers([])
                setUserProfile(null)
            }
            setInputValue(username)
            const response = await axios.get(`http://localhost:9999/api/v1/users/${username}`);
            setUsers(response.data)

        }catch(e){}
    }

    return(
        <form className="flex sticky top-0 justify-center flex-col items-center z-20" onSubmit={handleSubmit}>
            <div className="relative w-[80%]">
                <input placeholder={`Search someone...`} onChange={(e) => loadUsers(e.target.value)}  className=" border-[#2a2a2e] backdrop-blur bg-inherit outline-none p-3 border-2   w-[40%]  pl-3  text-white  placeholder:text-white font-thin"></input>
                <button className="-translate-x-8 translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
                <div className="w-[40%]">
                {users.length > 0 && 
                    (<ul className="absolute z-10 max-h-60 overflow-y-auto w-[40%]  flex flex-col  rounded-b-md backdrop-blur border-2 border-[#2a2a2e]">
                        {users.map((user) => {
                            return(
                                <li key={user.username} onClick={(e) => getProfile(user.username)} className=" font-thin text-white pl-3 p-2 cursor-pointer">
                                    {user.username}
                                </li>
                            );

                        })}
                    </ul>)
                    }
                </div>
            </div>
            
            
        </form>
    );
}

export default Search;