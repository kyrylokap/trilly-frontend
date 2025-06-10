import { use } from "react";
import PostContent from "../post/PostContent";


function UserProfile({profile, getBack, username}) {
    return(
        <div className="text-white flex flex-col">
            <p className=" cursor-pointer font-bold text-lg text-white flex flex-row items-center" onClick={getBack}>
                ←Back
            </p>
                <div className="flex flex-row justify-end gap-8 m-8 ml-16 p-2">

                    <div className="flex flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg"  width="44" height="44" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                    </div>

                    <div className="grid grid-flow-col ">
                        <div className="flex flex-col mr-10">
                            <p>{profile.username}</p>

                            <div className="flex flex-row gap-3 mt-6 cursor-pointer" >
                                <div className="flex flex-col">
                                    <p>Followers</p>
                                    {profile.followersCount}
                                </div>

                                <div className="flex flex-col cursor-pointer">
                                    <p>Followings</p>
                                    {profile.followingsCount}
                                </div>
                            </div>

                            <button className="bg-black text-xl font-light tracking-wider pl-6 pr-6 p-1 rounded-xl mt-6 hover:bg-gray-600 duration-500">
                                Follow
                            </button>

                            {username === profile.username ? <div className="pt-10 flex flex-row justify-start items-center gap-3 cursor-pointer">
                                <p>
                                    Settings
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                </svg>
                            </div> : <p></p>}
                            
                        </div>
                        <div className="flex flex-col">
                            <ul className="flex flex-row flex-wrap overflow-auto scrollbar-hide">
                            {profile.posts.map((post) => {
                                return(    
                                    <PostContent post={post} className={"flex flex-col max-w-[30%] m-[1%]"}/>
                                    );
                                })}
                            </ul>
                
                        </div> 
                    </div>
                    

                </div>
                
                   
        </div>    
    );
}

export default UserProfile;