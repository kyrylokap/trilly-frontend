import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import Main from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register';
import { PositionTracker } from './components/PositionTracker';
import { Oauth2Success } from './components/Oauth2Success';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { useState } from 'react';
import { IsTokenExpired } from './components/IsTokenExpired';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  return (
    <>
    <IsTokenExpired />
    <PositionTracker />
    <BrowserRouter>
      <Routes>
        
        <Route element={<PublicRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/register' element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
        </Route>
        
        <Route path='/oauth2/success' element={<Oauth2Success setIsAuthenticated={setIsAuthenticated}/>}/>
        <Route  element={<PrivateRoute isAuthenticated={isAuthenticated}/>}> 
            <Route path='/' element={<Main />}/>
            <Route path='/chat/:user' element={<Main />} />
        </Route>  
        
        
        
      </Routes >
    </BrowserRouter>
    </>
    
    
  );
}

export default App;
