
function Shares(){
    return(
            <div className="flex items-center gap-2 cursor-pointer pb-3 group">
                <svg xmlns="http://www.w3.org/2000/svg" 
                className="w-[clamp(8px,3vw,24px)] h-[clamp(8px,3vw,24px)] "  fill="white"  viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                </svg>
                <p className="text-white group-hover:text-[gray] duration-300">
                    Share
                </p>
            </div>
    );
}

export default Shares;
