import axios from "axios";

const url = "http://localhost:9999/api/v1/";

export const openChat = async (profileUsername, setSelectedChat, changeAside) =>{
    try{
        const response = await axios.get(`${url}users/getChat`, {
            params:{
                secondUsername: profileUsername
            }
        , 
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }});
        setSelectedChat(response.data);
        changeAside(true);
    }
    catch(e){}
}

export const getUserChats = async (setChats) => {
        try{
            const response = await axios.get(
                `${url}users/user/chats`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            );
            setChats(response.data)
            console.log(response.data)
        }
        catch (e) {}
    };

export const getSearchedChats = async (e, setSearchedChats) => {
    try{
        if(e === ""){
          setSearchedChats([]);
        }else{
          const response = await axios.get(`${url}chats/user/${e}`,
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
          );
        setSearchedChats(response.data);
        console.log(response.data);
        }
        
    }
    catch (e){}
}