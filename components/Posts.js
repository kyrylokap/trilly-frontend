import Post from "./post/Post";


function Posts(){

    const posts = [
        {
            user:"ydnmidny",
            place:"New York, California",
            photoUrl:"https://th.bing.com/th/id/OIP.dQHsjVQVrG7tjnGpE4Y4HAHaEK?cb=iwp2&rs=1&pid=ImgDetMain"
        },{
            user:"qwertyui0p",
            place:"Dallas",
            photoUrl:"https://th.bing.com/th/id/OIP.JTwRtbR_OcxB4tBNRNvqEAHaD5?w=343&h=180&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3"
        },{
            user:"Ishchuk",
            place:"Lublin",
            photoUrl:"https://th.bing.com/th/id/OIP.e7qB3w9n70dXH2mddB0lygHaEK?w=285&h=180&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3"
        }
    ];

    return(
        <div className="h-[80vh] w-[60vw] bg-[#18181a]  overflow-auto scrollbar-hide">
            <ul>
                {posts.map(
                    (post) =>{
                        return(
                            <Post post={post}/>
                        );    
                    }
                )}
            </ul>
            <h1 className="text-2xl mt-6 mb-3 text-white text-center">
                That's all...
            </h1>
        </div> 
    );
}

export default Posts;