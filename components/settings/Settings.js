import ChangePasswordForm from './ChangePasswordForm'
import { useState } from 'react';
import ChangeUsernameForm from './ChangeUsernameForm';

function Settings({ setUserProfile}){

    const [changePasswordBlock, setChangePasswordBlock] = useState(false);
    const useChangePassword = () => {
        setChangePasswordBlock(prev => !prev);
    }

    const [changeUsernameBlock, setChangeUsernameBlock] = useState(false);
    const useChangeUsername = () => {
        setChangeUsernameBlock(prev => !prev);
    }

    return(
        <div>
            {changeUsernameBlock === false ?
            <div>
                {changePasswordBlock === false ?
            <div className="flex flex-col gap-4">
                <p className="text-white text-center text-4xl font-medium">Settings</p>
                <ul className="flex flex-col text-[gray] gap-5">
                    <li onClick={useChangePassword} className="p-2 font-medium text-2xl border hover:bg-white hover:text-black duration-300 text-center cursor-pointer rounded-lg">
                        <p>Change password</p>
                    </li>
                    <li onClick={useChangeUsername} className="p-2 font-medium text-2xl border hover:bg-white hover:text-black duration-300 text-center cursor-pointer rounded-lg">
                        <p>Change username</p>
                    </li>
                    
                </ul>
            </div>:
            <ChangePasswordForm  useChangePassword={useChangePassword} />}
            </div>
            :
            <ChangeUsernameForm  useChangeUsername={useChangeUsername}/>}
        </div>
        
    );
}

export default Settings;