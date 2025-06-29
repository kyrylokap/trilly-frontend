import axios from "axios";
import { useState, useEffect } from "react";

function BlockButton({username, profileUsername}) {

    const [isBlocked, setIsBlocked] = useState(false);
    const checkBlockStatus = async () => {
        try{
            const response = await axios.get("http://localhost:9999/api/v1/users/user/checkBlock",{
                params:{
                    username: username,
                    profileUsername: profileUsername
                }
            })
            setIsBlocked(response.data);
        }catch(e){}
    }

    const changeBlockStatus = async () =>{
        try{
            checkBlockStatus();
            await axios.put(`http://localhost:9999/api/v1/users/user/${isBlocked ? `unblock`: `block`}`,null,
                {
                    params:{
                        username: username,
                        profileUsername: profileUsername
                    }
                }
            )
            setIsBlocked(!isBlocked);
        }
        catch(e){}
    }


    useEffect(() => {
        checkBlockStatus();
    });

    return(
        <button onClick={changeBlockStatus}
                className={`w-36 bg-black text-xl font-light tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500 ${username === profileUsername && `hidden`}`}>
                {isBlocked ? `Unblock` : `Block`}
        </button>
    );
}

export default BlockButton;