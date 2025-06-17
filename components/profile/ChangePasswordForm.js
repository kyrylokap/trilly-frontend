import { useState } from "react";
import axios from "axios";

export default function ChangePasswordForm({username, settings}) {
    const [prevPassword, setPrevPassword] = useState("");
    const changePrevPassword =  (prev) => {
        setPrevPassword(prev);
    }

    const [pass, setPass] = useState("");
    const changePass = (pass) => {
        setPass(pass);
    }

    const [changePasswordMSG, setChangePasswordMSG] = useState("");
    const changePassword = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.put("http://localhost:9999/api/v1/user/changePassword",
            {
                "username": username,
                "prevPassword": prevPassword,
                "newPassword": pass
            });
            setPass("");
            setPrevPassword("");
            setChangePasswordMSG(response.data.changePasswordMessage);
        }
        catch(e){}
    }

    return(
        <div>
            {settings && <div className="flex flex-col">
                <form className="flex flex-col gap-5 bg-zinc-800 p-3 rounded-md" onSubmit={changePassword} >
                    <input value={prevPassword} onChange={(e) => changePrevPassword(e.target.value)} type="password" placeholder={`Old password`} className="outline-none  p-0.5 bg-transparent border-b-[1px] text-white" />
                    <input value={pass} onChange={(e) => changePass(e.target.value)} type="password" placeholder={`New password`} className="outline-none text-white  p-0.5 bg-transparent border-b-[1px]" />
                    <button type="submit" className="bg-black text-white p-2">Change</button>    
                </form>
                <p>{changePasswordMSG}</p>
            </div>}
        </div>
        
    );
}