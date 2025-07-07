import axios from "axios"

const url = "http://localhost:9999/api/v1/user"

export const sendPos = async () => {
    try{
        navigator.geolocation.getCurrentPosition(async(position) => {
                await axios.post(`${url}/addPosition`,null,{
                params:{
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                },headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
                console.log("sended pos");
        });
        
    }
    catch(e){
        console.log(e);
    }
}

export const fetchPositions = async (profile, setPositions) => {
    try {
      const response = await axios.get(`${url}/positions/today`, {
        params:{
          username: profile.username
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
          setPositions(response.data);
          console.log("Fetched positions")
    } catch (e) {}
}
