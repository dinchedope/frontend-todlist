import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import module from './TodoBook.module.css';



 function TodoBook(props)
 {
    //       // <Link className={module.todoBook} to={`todolist/${props.id}`}>
    //       <div className={module.list}>
    //       <h1 className={module.listName}>{props.name}</h1>
    //       <p>{props.description}</p>
    //   </div>
    //   // </Link>

    return(
        <div className={module.list}>
            <div className={module.listHeader}>
                <div className={module.divListName}>
                    <h1 className={module.listName}>{props.name}</h1>
                </div>
                <div className={module.headerLogo}></div>
            </div>
            <div className={module.listBody}>
                <p className={module.description}>{props.description}</p>
            </div>
        </div>
    );
 }

 export default TodoBook;