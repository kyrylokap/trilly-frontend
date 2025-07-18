

export default function ExitButton({getBack}) {
    return(
        <div>
           <svg xmlns="http://www.w3.org/2000/svg" onClick={getBack} fill="currentColor"
                className={`ml-2 cursor-pointer w-[clamp(12px,5vw,16px)] h-[clamp(12px,5vh,16px)]  text-white hover:text-[gray] duration-300"  viewBox="0 0 16 16`}>
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 
                .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146
                 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg> 
        </div>
        
        
    );
}