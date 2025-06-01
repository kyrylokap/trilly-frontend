import Nav from '../Nav'
import Content from '../Content'
function Main(){
    const username = "kyrylo"
    return(
        <div className='w-[100vw] h-[100vh]'>
            <Nav />
            <Content username={username}/>
        </div>
    );
}

export default Main;