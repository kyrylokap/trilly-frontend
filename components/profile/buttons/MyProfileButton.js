import { getProfile } from "../../../services/userProfileService";

export default function MyProfileButton({username, setUserProfile}){
    
    return(
        <div className={`flex justify-center items-center gap-1 cursor-pointer h-10 group`} onClick={() => getProfile(username, setUserProfile)}>
            <svg xmlns="http://www.w3.org/2000/svg"  width="44" height="44" fill="currentColor" 
                className="group-hover:text-[gray] duration-200 text-white cursor-pointer w-[clamp(13px,5vw,25px)] h-[clamp(13px,5vh,25px)]" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg><p className="text-black duration-200 group-hover:text-[gray] text-transparent">My profile</p>
        </div>
    );
}