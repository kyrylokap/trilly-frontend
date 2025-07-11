import axios from "axios";
const url = "http://localhost:9999/api/v1/auth";

export const loginRequest = async (e, username, password, navigate, setIsAuthenticated) => {
   e.preventDefault();
   try{
        const response = await axios.post(`${url}/login`,{
            "username": username,
            "password": password
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        if(response.data.token !== null){
            navigate('/');
            setIsAuthenticated(true);
        }
        
    }
    catch(e){
        console.error("Login error:", e);
    }
}

export const registerRequest = async (e, username, password, password1, setResponse) => {
    e.preventDefault(); 
    try{
        const response = await axios.post(`${url}/register`,{
            "username": username,
            "password": password,
            "confirmPassword": password1
        });
        setResponse(response.data.message);
    }
    catch(e){}
}