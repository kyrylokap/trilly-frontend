
function Comments({setSelectedComments}){
    return(
        <div className="flex items-center gap-2 cursor-pointer pb-3 group" >
                <svg  xmlns="http://www.w3.org/2000/svg" className="w-[clamp(8px,3vw,24px)] h-[clamp(8px,3vw,24px)]" fill="white"  viewBox="0 0 16 16">
                    <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                <p onClick={() => setSelectedComments(true)} className="text-white group-hover:text-[gray] duration-300">
                    Comments
                </p>
            </div>
    );
}

export default Comments;