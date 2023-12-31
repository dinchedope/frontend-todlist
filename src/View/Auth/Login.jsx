import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector }  from 'react-redux';
import module from './Login.module.css'


import React from 'react';
import axios from '../../axios';

import { fetchAuth, isAuth } from '../../redux/slices/auth';

function Login(props){

    const dispatch = useDispatch();
    const userIsAuth = useSelector(isAuth);

    const { auth } = useSelector(state => state);
    const allState = useSelector(state => state);
    
    const [authData, setAuthData] = React.useState({
        email: null,
        password: null,
    });


    function emailChange(value){
        setAuthData({
            ...authData,
            ...{email: value},
        });
    }

    function passwordChange(value){
        setAuthData({
            ...authData,
            ...{password: value},
        });
    }

    async function fetchSubmit(){
        const data = await dispatch(fetchAuth(authData));
        console.log(data);
        if(!data.payload){
            return ;
        }
        if('token' in data.payload){
            window.localStorage.setItem('token', data.payload.token);
        }
    }
        
    if(userIsAuth){
        return <Navigate to="/"/>;
    }

    return(
        <div className={module.signIn}>
            <div className={module.login}>
                <h2 className={module.h2}>Login</h2>
                <p>email</p>
                <input onChange={e => {emailChange(e.target.value)}} type="text" name="input"/>
                <p>password</p>
                <input onChange={e => {passwordChange(e.target.value)}} type="password" name="input"/>
                <button className={module.button} onClick={fetchSubmit}>OK</button>
            </div>
            {/* <Register/> */}
        </div>
    )
}

export default Login;