import axios from "axios";
import { useState } from "react";

function BlockButton({username, profileUsername}) {

    const block = async () =>{
        try{
            await axios.put("http://localhost:9999/api/v1/users/user/block",
                {
                    params:{
                        username: username,
                        profileUsername: profileUsername
                    }
                }
            )
        }
        catch(e){}
    }


    return(
        <button onClick={block}
                className={`w-36 bg-black text-xl font-light tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500 ${username === profileUsername && `hidden`}`}>
                Block
        </button>
    );
}

export default BlockButton;