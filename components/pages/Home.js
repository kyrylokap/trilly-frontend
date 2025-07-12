import Nav from '../Nav'
import Content from '../Content'
import { useState, useEffect, useRef } from 'react';
import Notifications from '../Notifications';
import { getNotifications } from '../../services/notificationService';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function Main(){
    const [aside, setAside] = useState(false);
    const changeAside = async (e) => {
        setAside(e)
    }

    const [settings, setSettings] = useState(false);
    const openSettings = (e) =>{
        setSettings(e);
    }

    const [newPost, setAddPost] = useState(false);
    const addPost = (e) => setAddPost(e);
    const [profile, setUserProfile] = useState(null);

    const [notificationsBlock, showNotificationBlock] = useState(false);

    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        getNotifications(setNotifications);
    }, []);

    const stompClient = useRef(null);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:9999/ws"),
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            onConnect: () => {
                console.log("subscribed on topic");
              client.subscribe("/topic/notifications", (message) => {
                const notification = JSON.parse(message.body);
                if (notification.to === localStorage.getItem("username")) {
                  setNotifications((prev) => [ notification, ...prev]);
                }
              });}});

        client.activate();
        stompClient.current = client;

        return () => {
          client.deactivate();
        };
    }, []);

    return(
        <div className='w-[100vw] h-[100vh] select-none'>
            {notificationsBlock && <Notifications notifications={notifications} setNotifications={setNotifications} showNotificationBlock={showNotificationBlock}/>}
            <Nav addPost={addPost} aside={aside} changeAside={changeAside}  openSettings={openSettings} 
                    settings={settings} setUserProfile={setUserProfile} showNotificationBlock={showNotificationBlock}/>

            <Content stompClient={stompClient} addPost={addPost} newPost={newPost} aside={aside} changeAside={changeAside}  openSettings={openSettings} 
                    settings={settings} profile={profile} setUserProfile={setUserProfile}/>
        </div>
    );
}

export default Main;