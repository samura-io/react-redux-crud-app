import './App.css';
import React from 'react';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import OneElement from '../OneElement/OneElement';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { checkAuth } from '../../features/auth/auth-slice';

function App () {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  React.useEffect(()=>{
    dispatch(checkAuth());
}, [dispatch]);

const checkAuth1 = () => {
};

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={ <Main/> } />
        <Route path='/signup' element={ <Register/> } />
        <Route path='/signin' element={ <Login/> } />
        <Route path='/user/:id' element={ <OneElement/> } />
        <Route path='*' element={ <NotFound/> } />
      </Routes>
    </div>
  )
}

export default App;