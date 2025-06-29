import axios from "axios";

const url = "http://localhost:9999/api/v1/user/";

export const changePassword = async (e, username, prevPassword, pass, setPass, setPrevPassword, setChangePasswordMSG) =>{
    e.preventDefault();
    try{
        const response = await axios.put(`${url}changePassword`,
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

export const changeUsernameRequest = async (e, username, providedUsername, setResponseMSG) => {
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