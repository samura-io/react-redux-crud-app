import './App.css';
import React from 'react';
import Main from '../Main/Main';
import Login from '../Login/Login';
import { useDispatch } from 'react-redux';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import OneElement from '../OneElement/OneElement';
import { Routes, Route, useLocation } from 'react-router-dom';
import { setToken } from '../../store/slices/authSlice';

function App () {
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(()=>{
    checkAuth();
}, [location]);

const checkAuth = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt === 'QpwL5tke4Pnpja7X4') {
        dispatch(setToken({
            jwt: jwt,
        }))
    };
};

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={ <Main/> } />
        <Route path='/signup' element={ <Register/> } />
        <Route path='/signin' element={ <Login/> } />
        <Route path='/element' element={ <OneElement/> } />
        <Route path='*' element={ <NotFound/> } />
      </Routes>
    </div>
  )
}

export default App;