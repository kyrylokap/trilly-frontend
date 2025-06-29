import axios from "axios";

const url = "http://localhost:9999/api/v1/";

export const openChat = async (username, profileUsername, setSelectedChat, changeAside) =>{
    try{
        const response = await axios.get(`${url}users/getChat`, {
            params:{
                firstUsername: username,
                secondUsername: profileUsername
            }
        });
        setSelectedChat(response.data);
        changeAside(true);
    }
    catch(e){}
}

export const getUserChats = async (username, setChats) => {
        try{
            const response = await axios.get(
                `${url}users/${username}/chats`
            )
            setChats(response.data)
            console.log(response.data)
        }
        catch(error){}
    };

export const getSearchedChats = async (e, setSearchedChats, username) => {
    try{
        if(e === ""){
          setSearchedChats([]);
        }else{
          const response = await axios.get(`${url}chats/${username}/${e}`);
        setSearchedChats(response.data);
        }
        
    }
    catch (e){}
}