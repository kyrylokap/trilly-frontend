import axios from "axios"

export const getNotifications = async (setNotifications) => {
    try{
        const notifications = await axios.get("http://localhost:9999/api/v1/user/notifications",
            {
                headers:{
                    Authorization:"Bearer " + localStorage.getItem("token")
                }
            }
        );
        setNotifications(notifications.data); 
    }
    catch(e){
        console.log("Failed to get notificatios");
    }
}

export const sendNotification = async (to, text, stompClient) => {
    
    console.log(stompClient.current);
    console.log(stompClient.current.connected);
    if (stompClient && stompClient.current.connected) {
        stompClient.current.publish({
            destination: "/app/notifications.send",
            body: JSON.stringify({
                text: text,
                to: to
            })
        });
    } else {
        console.error("STOMP client not subcribe");
    }
}