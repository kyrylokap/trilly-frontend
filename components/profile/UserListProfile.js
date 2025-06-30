import { useState, useEffect } from "react";
import { getProfile } from "../../services/userProfileService";
import { getUsers } from "../../services/userListService";
import UserList from "./UserList";

function UserListProfile({choose, username, close, setUserProfile}) {
    const [users, setUsers] = useState([]);

    
    

    useEffect(() =>{
        getUsers(choose, username, setUsers);
    },[choose, username])


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-start items-center z-50 flex-col">
            
            <div className="bg-[#2a2a2e] rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={close} className="ml-3 cursor-pointer w-[clamp(1px,3vw,24px)] h-[clamp(1px,2vw,24px)]" fill="white" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-white text-center">
                  {choose ? "Followings" : "Followers"}
                </h2>
                <UserList users={users} getProfile={getProfile} setUserProfile={setUserProfile} close={close}/>
            </div>
        </div>
);

}

export default UserListProfile;