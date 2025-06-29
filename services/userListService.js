import axios from "axios";

export const getUsers = async (choose, username, setUsers) => {
    try {
        const endpoint = choose
            ? "http://localhost:9999/api/v1/users/user/followings"
            : "http://localhost:9999/api/v1/users/user/followers";
        const response = await axios.get(endpoint, {
            params: { username }
        });
        setUsers(response.data);
    } catch (e) {
        console.error("Failed to fetch users:", e);
    }
}