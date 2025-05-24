import Message from './Message'


function InChat({selectedUser, handleBack}){
    return(
        <div className="text-white ml-6">   
            <button className="text-white mb-4" onClick={handleBack}>
              ← Back
            </button>
        <h2 className="text-2xl font-semibold mb-4">{selectedUser.user}</h2>
        <div className="bg-[#808080]  p-4 rounded-t-lg space-y-2  overflow-y-auto max-h-[470px] scrollbar-hide">
            <ul className="space-y-2 flex-col ">
                {selectedUser.messages.map((message) => (
                    <Message message={message}/>
                ))}
            </ul>
        </div>
        <input placeholder="Type something..." className="placeholder:text-white bg-[#18181a] outline-none text-lg  w-[100%] p-3 rounded-b-lg"/>
        </div>
    );
}

export default InChat;