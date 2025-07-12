import axios from "axios"

export const getProfile = async (profileUsername, setUserProfile) =>{
    try{
        const response = await axios.get(`http://localhost:9999/api/v1/user/${profileUsername}`,
            {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
        setUserProfile(response.data)
    }catch(e){}
}

export const followUser = async (follow, profileUsername, setFollowersCount, getFollow, setUserProfile) =>{
    try{
        if(follow === true){
            await axios.put('http://localhost:9999/api/v1/users/user/unFollow',null,{
                params:{
                secondUsername:profileUsername
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            setFollowersCount(prev => prev - 1);
        }else{
            await axios.put('http://localhost:9999/api/v1/users/user/follow',null,{
                params:{
                secondUsername:profileUsername
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            setFollowersCount(prev => prev + 1);
        }
        getFollow();
        await getProfile(profileUsername, setUserProfile);
    }catch(e){}
}

export const loadUsers = async (usernameToFind, setUsers, setUserProfile, setInputValue) => {
    try{
        if(usernameToFind === ''){
            setUsers([])
            setUserProfile(null)
        }
        setInputValue(usernameToFind)
        const response = await axios.get(`http://localhost:9999/api/v1/users/${usernameToFind}`,
                {headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
        setUsers(response.data)
    }catch(e){}
}