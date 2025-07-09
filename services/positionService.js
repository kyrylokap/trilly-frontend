import axios from "axios"

const url = "http://localhost:9999/api/v1/user"

export const sendPos = async () => {
  if (localStorage.getItem('token') !== null) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      await axios.post(`${url}/addPosition`, null, {
        params: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      console.log("Position sent");
    } catch (e) {
      console.error("Error sending position:", e);
    }
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
