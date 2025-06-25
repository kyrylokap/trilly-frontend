import { useState } from "react";
import axios from "axios";
import ExitButton from "../ExitButton";

export default function ChangeUsernameForm({username, useChangeUsername}) {
    
    const [providedUsername, setProvidedUsername] = useState("");
    const changeUsername = (prUsername) => {
        setProvidedUsername(prUsername)
    }

    const [responseMSG, setResponseMSG] = useState("");

    const changeUsernameRequest = async (e) => {
        try{
            e.preventDefault();
            const responseMessage = await axios.put("http://localhost:9999/api/v1/user/changeUsername", null,
                {
                    params:{
                        oldUsername: username,
                        newUsername: providedUsername
                    }
                }
            ) 
            setResponseMSG(responseMessage.data);
        }
        catch(e){}
    }
   

    return(
        <div className="flex flex-col items-center gap-16">
            <p className="text-white text-center text-4xl font-medium flex flex-row items-center">
                Change username
            </p>

            <form className="flex flex-col gap-16 bg-zinc-800 p-14 rounded-md min-w-[50%] max-w-[50%]" onSubmit={(e) => changeUsernameRequest(e)}>
                <div className="flex justify-end">
                    <ExitButton getBack={useChangeUsername}/>
                </div>
                <input value={providedUsername} onChange={(e) => changeUsername(e.target.value)} placeholder={`New username`} className="outline-none  p-0.5 bg-transparent border-b-[1px] text-white" />
                <button type="submit" className="bg-black text-white p-2 rounded-xl hover:bg-[gray] duration-500">Change</button>
                <p className="break-words text-white">{responseMSG}</p>
            </form>
            
        </div>
    );
}