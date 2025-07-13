import ExitButton from "../ExitButton";


export default function MessageChangingBlock({setIsChanging, changingMessage, setInput, setChangingMessage, setId}){
    return(
        <div className='flex bg-[#524c4c] flex-col rounded-lg p-2'>
            <div className='flex  gap-2 items-center'>
                <ExitButton getBack={() => {
                    setIsChanging(false);
                    setInput('');
                    setChangingMessage('');
                    setId(0);
                }}/>
                <p>You are changing message: </p>
            </div>
            <p className='pl-2'>{changingMessage}</p>
        </div>
    );
}