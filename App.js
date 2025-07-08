import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import Main from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register';
import { PositionTracker } from './components/PositionTracker';
import { Oauth2Success } from './components/Oauth2Success';
function App() {
  return (
    <>
    <PositionTracker />
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />}/>  
        <Route path='/oauth2/success' element={<Oauth2Success />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/chat/:user' element={<Main />} />
      </Routes >
    </BrowserRouter>
    </>
    
    
  );
}

export default App;
