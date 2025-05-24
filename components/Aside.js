import { useState } from "react";
import Chats from "./Chats"
import InChat from "./chat/InChat";
function Aside(){
    const users = [
        {user:"ydnmidny",lastMsg:"HAHAHA LOL!",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},
        
        {user:"qwertyui0p",lastMsg:"Okay ill be there tonight)",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},
        
        {user:"Ishchuk",lastMsg:"No way",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},
        
        {user:"ydnmidny",lastMsg:"HAHAHA LOL!",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},
        
        {user:"qwertyui0p",lastMsg:"Okay ill be there tonight)",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},
        
        {user:"Ishchuk",lastMsg:"No way",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},
        
        {user:"ydnmidny",lastMsg:"HAHAHA LOL!",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},

        {user:"qwertyui0p",lastMsg:"Okay ill be there tonight)",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},

        {user:"Ishchuk",lastMsg:"No way",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},

        {user:"ydnmidny",lastMsg:"HAHAHA LOL!",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},

        {user:"qwertyui0p",lastMsg:"Okay ill be there tonight)",messages:[{msg :"Hello", time: '10:04'},{msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]},

        {user:"Ishchuk",lastMsg:"No way",messages:[{msg :"Hello", time: '10:03'},{msg :"How are you?", time: '10:05'},{msg :"Hello", time: '10:04'},
            {msg :"How are you?", time: '10:05'},{msg :"Hello", time: '10:05'},{msg :"How are you?", time: '10:05'},{msg :"Hello", time: '10:06'},
            {msg :"How are you?", time: '10:05'},
            {msg :"Ok, see you soon", time: '10:06'},{msg :"Oh my god!!!!!!!!!!!!", time: '10:07'},{msg :"HAHAHA LOL!", time: '10:07'}]}
    ];

    
    const [selectedUser, setSelectedUser] = useState(null);
    const handleBack = () => setSelectedUser(null);

  return (
    <div className="w-[40vw] bg-[#2a2a2e] h-[80vh] overflow-auto scrollbar-hide p-4">
      <p className="text-white font-semibold text-4xl pt-2 text-center">
        Your chats
      </p>
      <div className="flex flex-row items-center justify-center">
        <input
          placeholder="Search someone..."
          className="rounded-2xl m-4 p-2 pl-4 outline-none placeholder-black w-[70%] bg-[#808080] text-black font-semibold placeholder:font-semibold"
        />
      </div>
      {selectedUser === null ? 
        (<Chats users={users} setSelectedUser={setSelectedUser}/>): 
        (<InChat selectedUser={selectedUser} handleBack={handleBack}/>)
      }
    </div>
    );
}

export default Aside;