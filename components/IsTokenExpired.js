import axios from "axios";
import { useEffect } from "react";


export const IsTokenExpired = () => {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }
        axios
      .get("http://localhost:9999/api/v1/user/isTokenExpired", {
        params: { token },
      })
      .then((response) => {
        const isExpired = response.data;
        if (isExpired) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
        }
      })
      .catch((error) => {
        console.error("Token validаtion error", error);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      });
    }, []);
}
