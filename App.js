import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import Main from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={<Main />}/>  
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat/:user' element={<Main />} />
      </Routes >
    </BrowserRouter>
    
  );
}

export default App;
