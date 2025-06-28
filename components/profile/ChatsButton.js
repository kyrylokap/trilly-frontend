

export default function ChatsButton({changeAside, aside}){
    return(
        <div className={`flex justify-center items-center gap-1 cursor-pointer h-10 group`} onClick={(e) => changeAside(!aside)}>
            <p className="text-black duration-200 group-hover:text-[gray] text-transparent">Chats</p>
            <svg className="group-hover:text-[gray] duration-200 text-white cursor-pointer w-[clamp(15px,5vw,30px)] h-[clamp(15px,5vh,30px)]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33045 8.38999C0.250452 11.82 9.42048 14.9 9.42048 14.9C9.42048 14.9 12.5005 24.07 15.9305 21.99C19.5705 19.77 23.9305 6.13 21.0505 3.27C18.1705 0.409998 4.55045 4.74999 2.33045 8.38999Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.1999 9.12L9.41992 14.9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
}