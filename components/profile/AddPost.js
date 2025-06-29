import { post } from "../../services/postService";
import ExitButton from "../ExitButton";
import { useState } from "react";

export default function AddPost({addPost, username}){
    const [place, setPlace] = useState('');
    const updatePlace = (text) => {
        setPlace(text);
    }

    const [mediaUrl, serMediaUrl] = useState('');
    const updatePhotoUrl = (text) => {
        serMediaUrl(text);
    }

    const [description, setDescription] = useState('');
    const updateDescription = (text) => {
        setDescription(text);
    }

    const send = async (e) => {
        e.preventDefault();
        post(username, place, mediaUrl, description);
    }



    return(
         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 flex-col">
            <div className="bg-[#2a2a2e] rounded-2xl shadow-lg p-6 w-full max-w-sm max-h-[80vh] flex flex-col gap-4 text-center ">
                <ExitButton getBack={() => addPost(false)}/>
                    <h className={`text-4xl text-white `}>New post</h>
                    <form className="flex justify-center flex-col gap-1" onSubmit={(e) => send(e)}>
                        <div className="flex flex-col text-start text-white ">
                            <p className="z-10">Place</p>
                            <input onChange={(e) => updatePlace(e.target.value)} className="outline-none bg-[#4a4a4e] text-white p-1 rounded-md hover:shadow-[0_0_10px_10px_rgb(10,10,10)] duration-150"></input>
                        </div>
                        <div className="flex flex-col text-start text-white">
                            <p  className="z-10">Description</p>
                            <textarea onChange={(e) => updateDescription(e.target.value)} className="duration-150 hover:shadow-[0_0_10px_10px_rgb(10,10,10)] 
                                outline-none bg-[#4a4a4e] text-white p-1 rounded-md max-h-[200px] min-h-[100px] h-[100px]">

                            </textarea>
                        </div>
                        <div className="flex flex-col text-start text-white">
                            <p className="z-10">Photo url</p>
                            <input onChange={(e) => updatePhotoUrl(e.target.value)} className="outline-none hover:shadow-[0_0_10px_10px_rgb(10,10,10)] duration-150 bg-[#4a4a4e] text-white p-1 rounded-md "></input>
                        </div>
                        <button className="bg-black p-2 rounded-lg text-white mt-6 hover:bg-[#1a1818] duration-200">Post</button>
                    </form>
                
            </div>
        </div>
    );
}