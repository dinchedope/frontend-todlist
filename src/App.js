import logo from './logo.svg';
import module from './App.module.css';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer';
import Login from './Login.jsx';
import TodoList from './TodoList.jsx';

import { Routes, Route } from 'react-router-dom';

function App() {
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
