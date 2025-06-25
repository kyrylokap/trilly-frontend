import axios from "axios"

export const getProfile = async (profileUsername, setUserProfile) =>{
    try{
        const response = await axios.get("http://localhost:9999/api/v1/user/" + profileUsername)
        setUserProfile(response.data)
    }catch(e){}
}