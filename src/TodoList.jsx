import module from'./TodoList.module.css';
import React from 'react';
import axios from './axios';


import { useParams  } from 'react-router-dom';




function TodoList(props){
    

    // const [list, setList] = React.useState([
    //     {arr: [{name: "task1", description: "desc 1"}], name: "toDo"},
    //     {arr: [{name: "task2", description: "desc 2"}], name: "toCall"},
    //     {arr: [{name: "task3", description: "desc 3"}], name: "toGet"},
    // ])
    const [list, setList] = React.useState([
        {arr: [], name: "toDo"},
        {arr: [], name: "toCall"},
        {arr: [], name: "toGet"},
    ])

    const [reqToServer, setReqToServer] = React.useState({});
    const [isFirstLoad, setIsFirstLoad] = React.useState(true);



    const { id } = useParams();

    if(!isFirstLoad){
        Patch();
    }


    React.useEffect(() => {
        axios
        .get(`/todolist/${id}`)
        .then((obj) =>{
            setReqToServer(obj.data.todoList);
            //console.log(obj);
            let newList = list.slice();
            //console.log(obj.data.todoList.toDo);
            newList[0].arr = obj.data.todoList.toDo[0] === null ? [] : obj.data.todoList.toDo;
            newList[1].arr = obj.data.todoList.toCall[0] === null ? [] : obj.data.todoList.toCall;
            newList[2].arr = obj.data.todoList.toGet[0] === null ? [] : obj.data.todoList.toGet;

            setList(newList);
            //console.log(list);
        })
        .catch((err) => {
            //console.log(err);
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
        //console.log(list);
        const name = document.querySelector("." + module.input);
        const description = document.querySelector('textarea');
        let newList = list.slice();
        newList[0].arr.push({name: name.value, description: description.value})
        setList(newList);
        //Patch();
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
            })
            .catch((err) => {
                //console.log(err);
            });
    }
    


    return (
        <div className={module.main}>
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
                                        <h4 className={module.h4}>{task.name}</h4>
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

        </div>
    );
};

export default TodoList;