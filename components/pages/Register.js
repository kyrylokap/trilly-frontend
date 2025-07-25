import {Link} from 'react-router-dom'
import { useState } from 'react';
import { registerRequest } from '../../services/authService';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [password1, setPassword1] = useState(''); 
    const [response, setResponse] = useState(''); 

    

    return(
        <div className="flex flex-col items-center h-[100vh] justify-center bg-[#18181a]">
            <div className="bg-[#0c0c0f] flex flex-col pb-8 pt-16 rounded-xl p-4">

                <form className='flex flex-col' onSubmit={(e) => registerRequest(e, username, password, password1, setResponse)}>
                    <h1 className="text-5xl text-center font-bold text-white">Register</h1>
                    <p className="ml-6 text-white mt-3 ">Username</p>
                    <input  className="outline-none m-5 p-1 rounded-xl mt-0" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <p className="ml-6 text-white mt-3 m-0" >Password</p>
                    <input className="outline-none m-5 p-1 rounded-xl mt-0" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <p className="ml-6 text-white mt-3 m-0" value={password1} >Confirm password</p>
                    <input className="outline-none m-5 p-1 rounded-xl mt-0" type="password" onChange={(e) => setPassword1(e.target.value)}/>
                    <p className={`text-white text-center`}>{response}</p>
                    <div className="flex flex-row justify-center" >
                        <Link to={"/login"}>
                        <button className="w-32 m-2 p-2 bg-black text-white rounded-lg 
                            hover:shadow-[0_0_5px_7px_rgb(40,40,40)] duration-200 ring-2 ring-[rgb(40,40,40)]">Log in</button> 
                        </Link> 
                        <button className="w-32 m-2 p-2 border-none bg-white text-black rounded-lg
                                            hover:shadow-[0_0_5px_7px_rgb(255,255,255)] duration-200 ring-2 ring-black">Register</button> 
                        
                    </div>
                </form>

            </div>
            
        </div>
    );
}

export default Register;
