import module from './Main.module.css';
import TodoBook from './../TodoBook/TodoBook.jsx';
import DataPanel from '../../DataPanel/DataPanel.jsx'
import CreateTodoBook from './../CreateTodoBook/CreateTodoBook.jsx'
import { useDispatch, useSelector }  from 'react-redux';
import { isAuth, logout } from '../../../redux/slices/auth';

import React from 'react';

import { fetchTodoLists } from '../../../redux/slices/todoLists';


function Main(props){
    const Standart = {
        bcgcolor: '#000000',
        hoverColor: '#4D4D4D',
    };
    const userIsAuth = useSelector(isAuth);
    const dispatch = useDispatch();
    const { todoLists } = useSelector(state => state.todoLists);

    const isTodoListLoading = todoLists.status === 'loading';

    React.useEffect(() => { 
        dispatch(fetchTodoLists());
    }, []);

    return(
        <>
          <div className={module.mainWrapper}>
            {userIsAuth ? (
                <>
            <div className={module.Main}>
            <div className={module.funcChanger}>
                <div className={module.funcChangerMenu}>
                    <a className={module.funcChangerButt}>Todo</a>
                    <a className={module.funcChangerButt}>Links</a>
                </div>
            </div>
            <div className={module.books}>
                {isTodoListLoading || todoLists.items === undefined ? (<></>) : todoLists.items.map((obj, index) => isTodoListLoading ? ( 
                    <></>
                ):
                (
                    <TodoBook id={obj._id} color={Standart.bcgcolor}  hoverColor={Standart.hoverColor}  name={obj.title} description={obj.description} date={"123"} />
                )
                )}
                <CreateTodoBook/>
            </div>
        
            </div>
            <div className={module.dataPanel}>
                <DataPanel />
            </div></>
            ) : userIsAuth === false ? (<></>) : (<>
            <h1>You haven't account. If You need account to testing contact me via my github</h1>
            </>)}
            

        </div>
        </>
      
    );
}

export default Main;