import module from'./TodoList.module.css';
import React, { useEffect } from 'react';
import axios from '../../../axios';

import { Navigate, useParams  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuth } from '../../../redux/slices/auth';


function TodoList(props){
    
    const userIsAuth = useSelector(isAuth);

    const [list, setList] = React.useState([
        {arr: [], name: "Task"},
        {arr: [], name: "In process"},
        {arr: [], name: "Done"},
    ])

    const [reqToServer, setReqToServer] = React.useState({});
    const [isFirstLoad, setIsFirstLoad] = React.useState(true);
    const [isError, setIsError] = React.useState(false);



    const { id } = useParams();

    if(!isFirstLoad){
        console.log("Patching");
        Patch();
    }

    React.useEffect(() => {
        console.log('use effect');
        axios
        .get(`/todolist/${id}`)
        .then((obj) =>{ 
            setIsError(false);
            setReqToServer(obj.data.todoList);

            let newList = list.slice();

            newList[0].arr = obj.data.todoList.toDo[0] === null ? [] : obj.data.todoList.toDo;
            newList[1].arr = obj.data.todoList.toCall[0] === null ? [] : obj.data.todoList.toCall;
            newList[2].arr = obj.data.todoList.toGet[0] === null ? [] : obj.data.todoList.toGet;

            setList(newList);
            //console.log(list);
        })
        .catch((err) => {
            //console.log(err);
            console.log(err);
            setIsError(true);
        });
        setIsFirstLoad(false);
      
    }, []);

    const [currentTable, setCurrentTable] = React.useState(null);
    const [currentTask, setCurrentTask] = React.useState(null);

    function dragOverHandler(e){   
        e.preventDefault();
    }

    function dragLeaveHandler(e){

    }

    function dragStartHandler(e, table, task){
        setCurrentTable(table);
        setCurrentTask(task);
    }

    function dragEndHandler(e){

    }

    function dropHandler(e, table, task){
        if(currentTask !== null){
            e.preventDefault();
            e.stopPropagation();
            const currentIndex = currentTable.arr.indexOf(currentTask);
            currentTable.arr.splice(currentIndex, 1);
            //console.log(table);
            table.arr.push(currentTask);

            setList(list.map(b => {
                if(b.name === table.name){
                    return table;
                }
                if(b.name === currentTable.name){
                    return currentTable;
                }
                return b;
            }));
        }
        setCurrentTable(null);
        setCurrentTask(null);
    }
    
    function dropCardHandler(e, table){
        
        if(currentTask !== null){
            const currentIndex = currentTable.arr.indexOf(currentTask);
            currentTable.arr.splice(currentIndex, 1);
            table.arr.push(currentTask);
            
            setList(list.map(b => {
                if(b.name === table.name){
                    return table;
                }
                if(b.name === currentTable.name){
                    return currentTable;
                }
                return b;
            }));
        }
        setCurrentTable(null);
        setCurrentTask(null);
    }

    function createTask(e){
        const name = document.querySelector("." + module.input);
        const description = document.querySelector('textarea');
        let newList = list.slice();
        newList[0].arr.push({name: name.value, description: description.value})
        setList(newList);
    }

    function deleteTask(e, table, task, index){
        table.arr.splice(index, 1);

        setList(list.map(b => {
            if(b.name === table.name){
                return table;
            }
            return b;
        }));
    }

    function Patch(){
        //console.log(reqToServer);
        axios.patch(`/todolist/${id}`, reqToServer)
            .then((obj) =>{
                console.log("PathOK");
            })
            .catch((err) => {
                setIsError(true);
                console.log(err);      
            });
        
    }

    return (
        <div className={module.main}>
            {!isError ? (
                <>
                <div className={module.createTask}>
                    <p className={module.p}>Name</p>
                    <input className={module.input} type="Text"/>
                    <p className={module.p}>Description</p>
                    <textarea className={module.textareai} name="textarea2" rows="4" cols="30"/>
                    <button onClick={(e) => createTask(e)} className={module.buttonCreate} value='Додати'>Додати</button>
                </div>

                {list.map((table, index) => {
                    return (
                        <div className={module.toDo}
                                        draggable="false" 
                                        onDragOver = {(e) => dragOverHandler(e)}
                                        onDrop={(e) => dropCardHandler(e, table)}>
                                            
                            <h3 draggable="false"  className={module.h3}>{table.name}</h3>
                            {/* <h3 className={module.h3}>{obj[0]}</h3> */}
                            {table.arr[0] !== null ? table.arr.map((task, index) => {
                                return (
                                    <div 
                                        className={module.task}
                                        draggable="true" 
                                        onDragOver = {(e) => dragOverHandler(e)}
                                        onDragLeave={e => dragLeaveHandler(e)}
                                        onDragStart={(e) => dragStartHandler(e, table, task)}
                                        onDragEnd={(e) => dragEndHandler(e)}
                                        onDrop={(e) => dropHandler(e, table, task)}
                                        //onClick={console.log(list)}
                                    >
                                    
                                        <div className={module.info}>
                                            <div className={module.taskName}>
                                                <h4 className={module.h4}>{task.name}</h4>
                                            </div>
                                            <p className={module.p}>{task.description}</p>
                                        </div>
                                        <div onClick={(e) => deleteTask(e, table, task, index)} className={module.remove}>
                                        </div>

                                    </div>
                                )
                            }) : (<></>)}
                        </div>
                    )
                })}

            </>): 
                (<><h1>404</h1></>)}
        </div>
        
    );
};

export default TodoList;