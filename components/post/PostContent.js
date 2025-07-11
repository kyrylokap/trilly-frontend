import UserSvg from "../UserSvg";
import { getProfile } from "../../services/userProfileService";
import { sendNotification } from "../../services/notificationService";

function PostContent({post, className, setUserProfile, stompClient}) {
    return(
        <div key={post} className={`ml-7 mt-7 text-white w-[60%] text-thin`}>
            <div className="flex items-center mb-7 cursor-pointer gap-2">
                <div className="flex items-center hover:text-[gray] duration-200">
                    <UserSvg />
                    <p className="ml-6 text-xs sm:text-base" onClick={() => {
                        getProfile(post.username, setUserProfile);
                        sendNotification(post.username, ' visited your profile',stompClient);
                    }}>{post.username}</p>
                </div>
                <div className="flex items-center">
                   <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                <p className="text-xs sm:text-base">{post.place}</p> 
                </div>
                
            </div>
            <img src={post.mediaUrl} className="w-full rounded-l-lg "/>
            
        </div>
    );
}



export default PostContent;