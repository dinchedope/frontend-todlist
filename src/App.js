import logo from './logo.svg';
import module from './App.module.css';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer';
import Login from './Login.jsx';
import TodoList from './TodoList.jsx';

import { Routes, Route } from 'react-router-dom';
import { fetchAuthMe, isAuth } from './redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() =>{
    //console.log('app');
    dispatch(fetchAuthMe());
  }, []);

  return (  
      <div className={module.background}>
        <Header/>
        <div className={module.mainBlock}> 
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/todolist/:id" element={<TodoList/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
      
  );
}

export default App;
