

export default function Loader(){
    return(
        <div className="flex flex-col  items-center">
            <div className="lg:w-10 lg:h-10 sm:w-2 sm:h-2 rounded-full border-[6px] border-white border-b-[gray]  animate-spin"></div>
            <p className="text-white sm:text-xs lg:text-lg">Loading</p>
        </div>
        
    );
}