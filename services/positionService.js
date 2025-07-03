import axios from "axios"

export const sendPos = async () => {
    try{
        await axios.post("http://localhost:9999/api/v1/user/addPosition",null,{
            params:{
                longitude:33.0,
                latitude: 46.0
            }
        ,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
        console.log("sended pos");
    }
    catch(e){}
}