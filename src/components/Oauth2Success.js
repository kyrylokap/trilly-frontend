import { useEffect  } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export const Oauth2Success = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const username = params.get("username");

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        navigate("/");
        setIsAuthenticated(true)
      } else {
        navigate("/login");
      }
    }, [location, navigate]);


}