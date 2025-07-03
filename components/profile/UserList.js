import { sendPost } from "../../services/inChatService";


export default function UserList({ users, getProfile, setUserProfile, close, mode, mediaUrl}){
    return (
        <ul className="space-y-3">
           {users.length > 0 ? (
             users.map((user) => (
               <li key={user.id || user.username} onClick={() => {
                  if (mode === true) {
                    getProfile(user.username, setUserProfile);
                    close();
                  } else {
                    sendPost(user.username, mediaUrl)
                  }
                }}
                 className="flex items-center justify-between p-3 rounded-lg shadow-sm  hover:shadow-xl transition cursor-pointer">
                     <div className="flex items-center gap-4">
                         <svg xmlns="http://www.w3.org/2000/svg"  width="44" height="44" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
                                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                 <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                         </svg>
                         <p  className="font-medium text-white text-lg ">{user.username}</p>
                     </div>
                 
                 <p className="text-sm text-gray-500">{user.status}</p>
               </li>
             ))
           ) : (
             <p className="text-center text-gray-500">No users yet</p>
           )}
         </ul>
    );
}