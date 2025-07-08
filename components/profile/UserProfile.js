import { useState, useEffect, useRef } from "react";
import axios from 'axios'
import Post from "../post/Post";
import UserListProfile from "./UserListProfile";
import UserProfileInfo from "./UserProfileInfo";
import ExitButton from '../ExitButton'
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { fetchPositions, sendPos } from "../../services/positionService";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function UserProfile({profile, getBack, setUserProfile, setSelectedChat, 
                    changeAside}) {
    const [follow, setFollow] = useState(false);
    const getFollow =  async() =>{
        try{
            const response = await axios.get('http://localhost:9999/api/v1/users/user/checkFollow',{
                params:{
                    secondUsername:profile.username
                }
            ,headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            setFollow(response.data)
        }catch(e){}
    }
    const [followersCount, setFollowersCount] = useState(profile.followersCount);

    useEffect(() => {
        setFollowersCount(profile.followersCount);
        getFollow();
    }, [profile.username]);

    const [followings, setFollowings] = useState(false);
    const showFollowings = () =>{
        setFollowings(true)
    }

    const [followers, setFollowers] = useState(false);
    const showFollowers = () =>{
        setFollowers(true)
    }

    const close = () => {
        setFollowers(false);
        setFollowings(false);
    }
    
    const [positions, setPositions] = useState([]);
    useEffect(() => {
      fetchPositions(profile, setPositions);
    }, [profile.username]);

    const mapRef = useRef(null);
      useEffect(() => {
       if (positions.length > 0 && mapRef.current) {
         const lastPos = positions[positions.length - 1];
         mapRef.current.flyTo([lastPos.latitude, lastPos.longitude], 20, {
           duration: 1.5
         });
       }
    }, [positions]);
    
    
        

    return(
        <div className="text-white flex flex-col">
                {followings && <UserListProfile choose={true} username={profile.username} close={close} setUserProfile={setUserProfile}/>}
                {followers && <UserListProfile choose={false} username={profile.username} close={close} setUserProfile={setUserProfile}/>}
                <ExitButton getBack={getBack}/>
                <div className="flex flex-col gap-8 p-2">
                    <div className="flex flex-row">
                        <UserProfileInfo setUserProfile={setUserProfile} changeAside={changeAside} profileUsername={profile.username} showFollowers={showFollowers} followersCount={followersCount} 
                            showFollowings={showFollowings} followingsCount={profile.followingsCount} follow={follow} 
                            setFollowersCount={setFollowersCount} getFollow={getFollow}setSelectedChat={setSelectedChat}/>
                         
                    </div>
                    <div className=" h-[400px] w-[90%] mt-[20px] flex justify-start ml-6 z-0 " >
                        {positions.length > 0 ? (
                        <MapContainer 
                          center={[positions[positions.length - 1].latitude, positions[positions.length - 1].longitude]}
                          zoom={20}
                          scrollWheelZoom={{filter: (event) => event.ctrlKey === true}}
                          whenCreated={mapInstance => { mapRef.current = mapInstance }}>
                          <TileLayer
                            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          {positions.map((pos, idx) => (
                            <CircleMarker key={idx} center={[pos.latitude, pos.longitude]} 
                             radius={3} color="black" fillColor="black" 
                             fillOpacity={0.8} >

                              <Popup>
                                <p>{pos.time}</p>
                              </Popup>
                              
                            </CircleMarker>
                          ))}
                        </MapContainer>
                        ) : (
                          <div className="flex justify-center items-center h-full text-gray-400">
                            Map is loading
                          </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <ul>
                        {profile.posts.map((post) =>{
                            return(<Post post={post} key={post.postId}  setUserProfile={setUserProfile}/>);
                            })}
                        </ul>
                    </div> 
                </div>
        </div>    
    );
}

export default UserProfile;