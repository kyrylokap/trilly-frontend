import { useState, useEffect } from "react";
import axios from "axios";
import { getProfile } from "../../services/userProfileService";

function UserList({choose, username, close, setUserProfile}) {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const endpoint = choose
                ? "http://localhost:9999/api/v1/users/user/followings"
                : "http://localhost:9999/api/v1/users/user/followers";

            const response = await axios.get(endpoint, {
                params: { username }
            });

            setUsers(response.data);
        } catch (e) {
            console.error("Failed to fetch users:", e);
        }
    }
    

    useEffect(() =>{
        getUsers();
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
                <ul className="space-y-3">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <li key={user.id || user.username} onClick={() =>{
                            getProfile(user.username, setUserProfile);
                            close();
                        }}
                        className="flex items-center justify-between p-3 rounded-lg shadow-sm  hover:shadow-xl transition cursor-pointer">
                            <div className="flex items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg"  width="44" height="44" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                                <p  className="font-medium text-white">{user.username}</p>
                            </div>
                        
                        <p className="text-sm text-gray-500">{user.status}</p>
                      </li>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No users yet</p>
                  )}
                </ul>
            </div>
        </div>
);

}

export default UserList;