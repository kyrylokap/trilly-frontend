import axios from "axios"

export const getProfile = async (profileUsername, setUserProfile) =>{
    try{
        const response = await axios.get("http://localhost:9999/api/v1/user/" + profileUsername)
        setUserProfile(response.data)
    }catch(e){}
}

export const followUser = async (follow, username, profileUsername, setFollowersCount, getFollow) =>{
    try{
        if(follow === true){
            await axios.put('http://localhost:9999/api/v1/users/user/unFollow',
                {
                "firstUsername":username,
                "secondUsername":profileUsername
            })
            setFollowersCount(prev => prev - 1);
        }else{
            await axios.put('http://localhost:9999/api/v1/users/user/follow',
                {
                "firstUsername":username,
                "secondUsername":profileUsername
            })
            setFollowersCount(prev => prev + 1);
        }
        getFollow()
    }catch(e){}
}

export const loadUsers = async (usernameToFind, setUsers, setUserProfile, setInputValue, username) => {
    try{
        if(usernameToFind === ''){
            setUsers([])
            setUserProfile(null)
        }
        setInputValue(usernameToFind)
        const response = await axios.get(`http://localhost:9999/api/v1/users/${usernameToFind}`,{
          params:{
            username: username
          }
        });
        setUsers(response.data)
    }catch(e){}
}