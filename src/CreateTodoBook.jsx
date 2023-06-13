import react from 'react';
import { Link } from 'react-router-dom';
import module from'./CreateTodoBook.module.css';

export default function CreateTodoBook(props){
    return(
        <div className={module.add}>
            <div className={module.plusWrapper}>
                <div className={module.plus2}></div>
                <div className={module.plus}></div>
            </div>
        </div>
    )
}