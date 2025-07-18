import axios from "axios";
import { useState, useEffect } from "react";

function BlockButton({ profileUsername}) {

    const [isBlocked, setIsBlocked] = useState(false);
    const checkBlockStatus = async () => {
        try{
            const response = await axios.get("http://localhost:9999/api/v1/users/user/checkBlock", {
            params: {
                profileUsername: profileUsername
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
            setIsBlocked(response.data);
        }catch(e){}
    }

    const changeBlockStatus = async () =>{
        try{
            checkBlockStatus();
            await axios.put(`http://localhost:9999/api/v1/users/user/${isBlocked ? `unblock`: `block`}`,null,{
                params:{
                    profileUsername: profileUsername
                }
            ,headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            setIsBlocked(!isBlocked);
        }
        catch(e){}
    }


    useEffect(() => {
        checkBlockStatus();
    });

    return(
        <button onClick={changeBlockStatus}
                className={`w-36 bg-black text-xl font-light tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500 ${localStorage.getItem("username") === profileUsername && `hidden`}`}>
                {isBlocked ? `Unblock` : `Block`}
        </button>
    );
}

export default BlockButton;