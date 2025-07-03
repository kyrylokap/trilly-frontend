import { useState } from "react";
import { changePassword } from "../../services/settingsService";
import ExitButton from "../ExitButton";

export default function ChangePasswordForm({ useChangePassword}) {
    const [prevPassword, setPrevPassword] = useState("");
    const changePrevPassword =  (prev) => {
        setPrevPassword(prev);
    }

    const [pass, setPass] = useState("");
    const changePass = (pass) => {
        setPass(pass);
    }

    const [changePasswordMSG, setChangePasswordMSG] = useState("");
    

    return(
        <div className="flex flex-col items-center gap-16">
            <p className="text-white text-center text-4xl font-medium flex flex-row items-center">
                Change password
            </p>
            <form className="flex flex-col gap-16 bg-zinc-800 p-14 rounded-md min-w-[50%] max-w-[50%]" 
                onSubmit={(e) => changePassword(e, prevPassword, pass, setPass, setPrevPassword, setChangePasswordMSG)}>
                    
                <div className="flex justify-end">
                    <ExitButton getBack={useChangePassword}/>
                </div>
                
                <input value={prevPassword} onChange={(e) => changePrevPassword(e.target.value)} type="password" placeholder={`Old password`} className="outline-none  p-0.5 bg-transparent border-b-[1px] text-white" />
                <input value={pass} onChange={(e) => changePass(e.target.value)} type="password" placeholder={`New password`} className="outline-none text-white  p-0.5 bg-transparent border-b-[1px]" />
                <button type="submit" className="bg-black text-white p-2 rounded-xl hover:bg-[gray] duration-500">Change</button>    
                <p className="break-words text-white">{changePasswordMSG}</p>
            </form>
            
        </div>
    );
}