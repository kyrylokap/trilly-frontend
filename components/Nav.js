
function Nav({changeAside, aside}){
    return(
        <nav className="h-[15vh] bg-[#0c0c0f] flex items-center justify-between">
            <h1 className="text-8xl font-bold m-3 text-white">Trilly</h1>
            <div className={`${aside && 'hidden'} flex justify-end p-3 cursor-pointer h-10`} onClick={(e) => changeAside(true)}>
                <svg className="cursor-pointer w-[clamp(15px,5vw,50px)] h-[clamp(15px,5vh,50px)]" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.33045 8.38999C0.250452 11.82 9.42048 14.9 9.42048 14.9C9.42048 14.9 12.5005 24.07 15.9305 21.99C19.5705 19.77 23.9305 6.13 21.0505 3.27C18.1705 0.409998 4.55045 4.74999 2.33045 8.38999Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.1999 9.12L9.41992 14.9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </nav>
    );
}

export default Nav;