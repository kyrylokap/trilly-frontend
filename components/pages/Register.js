import {Link} from 'react-router-dom'


function Register(){

    return(
        <div className="flex flex-col items-center h-[100vh] justify-center bg-[#18181a]">
            <div className="bg-[#0c0c0f] flex flex-col pb-8 pt-16 rounded-xl p-4">

                <form className='flex flex-col'>
                    <h1 className="text-5xl text-center font-bold text-white">Register</h1>
                    <p className="ml-6 text-white mt-3 ">Username</p>
                    <input  className="outline-none m-5 p-1 rounded-xl mt-0"/>
                    <p className="ml-6 text-white mt-3 m-0">Password</p>
                    <input className="outline-none m-5 p-1 rounded-xl mt-0" type="password"/>
                    <p className="ml-6 text-white mt-3 m-0">Confirm password</p>
                    <input className="outline-none m-5 p-1 rounded-xl mt-0" type="password"/>
                    
                    <div className="flex flex-row justify-center" >
                        <Link to={"/login"}>
                        <button className="w-32 m-2 p-2  bg-black text-white rounded-lg border-none">Log in</button> 
                        </Link> 
                        <button className="w-32 m-2 p-2 border-none bg-white text-black rounded-lg">Register</button> 
                        
                    </div>
                </form>

            </div>
            
        </div>
    );
}

export default Register;
