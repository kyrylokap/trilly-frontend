

export default function NotificationButton({showNotificationBlock}){
    return(
        <div className={`flex justify-center items-center gap-1 cursor-pointer h-10 group`} onClick={() => showNotificationBlock(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"
            className="group-hover:text-[gray] duration-200 text-white cursor-pointer w-[clamp(17px,5vw,30px)] pt-1 h-[clamp(17px,5vh,30px)]">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
            </svg>
            <p className="text-black duration-200 group-hover:text-[gray] text-transparent hidden md:block">Notifications</p>
        </div>
    );
}