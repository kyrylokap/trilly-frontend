import axios from "axios";

const url = "http://localhost:9999/api/v1/user/";

export const changePassword = async (e, prevPassword, pass, setPass, setPrevPassword, setChangePasswordMSG) =>{
    e.preventDefault();
    try{
        const response = await axios.put(`${url}changePassword`,
        {
            "prevPassword": prevPassword,
            "newPassword": pass
        },
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
        setPass("");
        setPrevPassword("");
        setChangePasswordMSG(response.data.changePasswordMessage);
    }
    catch(e){}
}

export const changeUsernameRequest = async (e, providedUsername, setResponseMSG) => {
    try{
        e.preventDefault();
        const responseMessage = await axios.put("http://localhost:9999/api/v1/user/changeUsername", null,
            {
                params:{
                    newUsername: providedUsername
                }
            },
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
        );
        setResponseMSG(responseMessage.data);
    }
    catch(e){}
}