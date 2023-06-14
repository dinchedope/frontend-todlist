import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import module from './TodoBook.module.css';



 function TodoBook(props)
 {

    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [isMenuItem_EditHovered, setEditHovered] = useState(false);
    const [isMenuItem_DeleteHovered, setDeleteHovered] = useState(false);

    const menuItem = {
        "width": "80px",
        "height": "80px",
        "stroke": "#c9c9c9",
        "transition": "all 0.3s ease-out",
    };

    const menuItemHovered = {
        "width": "80px",
        "height": "80px",
        "stroke": "#000000",
        "transition": "all 0.3s ease-out",
    };

    const menuItem_p = {
        "opacity": "0%",
        "transition": "all 0.3s ease-out",
    };

    const menuItem_pHovered = {
        "opacity": "100%",
        "transition": "all 0.3s ease-out",
    };

    function menuBack(){
        setIsMenuClicked(false);
    }

    function menuClicked(){
        setIsMenuClicked(true);
    };

    function EditMouseOvered(){
        setEditHovered(true);
    };

    function EditMouseLeaved(){
        setEditHovered(false);
    };

    function DeleteMouseOvered(){
        setDeleteHovered(true);
    };

    function DeleteMouseLeaved(){
        setDeleteHovered(false);
    };



    return(
        <>
            {!isMenuClicked ? 
                (<div className={module.list}>
                    <div className={module.listHeader}>
                        <div className={module.divListName}>
                            <Link to={`/todolist/${props.id}`}>
                                <h1 className={module.listName}>{props.name}</h1>
                            </Link>
                        </div>
                        <div onClick={menuClicked} className={module.headerMenu}></div>
                    </div>
                    <div className={module.listBody}>
                        <p className={module.description}>{props.description}</p>
                </div>
            </div>) :
            (<div className={module.list}>
                <div className={module.menuBack}
                        onClick={menuBack}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> */}
                </div>
                <div className={module.listMenu}>
                    <div 
                    onMouseOver={EditMouseOvered} 
                    onMouseLeave={EditMouseLeaved}
                    className={module.menuItemBox}>
                        <p style={isMenuItem_EditHovered ? menuItem_pHovered : menuItem_p}>edit</p>
                        <svg style={isMenuItem_EditHovered ? menuItemHovered : menuItem} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </div>
                    <div 
                    onMouseOver={DeleteMouseOvered}
                    onMouseLeave={DeleteMouseLeaved}
                    className={module.menuItemBox}>
                        <svg style={isMenuItem_DeleteHovered ? menuItemHovered : menuItem} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <p style={isMenuItem_DeleteHovered ? menuItem_pHovered : menuItem_p}>remove</p>
                    </div>
                </div>
            </div>)}
        </>
        
    );
 }

 export default TodoBook;