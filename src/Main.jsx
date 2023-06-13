import module from './Main.module.css';
import TodoBook from './TodoBook';
import CreateTodoBook from './CreateTodoBook';
import { useDispatch, useSelector }  from 'react-redux';

import React from 'react';
import axios from './axios';


import { fetchTodoLists } from './redux/slices/todoLists';


function Main(props){
    const Standart = {
        bcgcolor: '#000000',
        hoverColor: '#4D4D4D',
    };
    const dispatch = useDispatch();
    const { todoLists } = useSelector(state => state.todoLists);

    const isTodoListLoading = todoLists.status === 'loading';

    React.useEffect(() => { 
        dispatch(fetchTodoLists());
    }, []);

    todoLists.items.map((obj, index) => console.log(obj));

    return(
        <div className={module.Main}>
             {/* <h1>Схоже, що у вас ще не створено жодного списку справ</h1> */}
            <div className={module.funcChanger}>
                <div className={module.funcChangerMenu}>
                    <a className={module.funcChangerButt}>Todo</a>
                    <a className={module.funcChangerButt}>Links</a>
                </div>
            </div>
            <div className={module.books}>
            
                {(isTodoListLoading ? [...Array(2)] : todoLists.items).map((obj, index) => isTodoListLoading ? ( 
                    <></>
                ):
                (
                    <TodoBook id={obj._id} color={Standart.bcgcolor}  hoverColor={Standart.hoverColor}  name={obj.title} description={obj.description} date={"123"} />
                )
                )}
                    <CreateTodoBook/>
            </div>
        </div>
    );
}

export default Main;