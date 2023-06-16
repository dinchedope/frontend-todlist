import React, {useState} from 'react'
import module from './DataPanel.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {setData} from './redux/slices/dataInfo';
import Charts from './Chart';
import { setIsEditing } from './redux/slices/editing';
import axios from './axios.js';
import { fetchTodoLists } from './redux/slices/todoLists';

const Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

function DataPanel(){

    const dispatch = useDispatch();
    
    const isEditing = useSelector(state => state.editing.isEditing);
    const {dataInfo} = useSelector(state => state.dataInfo);
    const accInfo = useSelector(state => state.auth);
    const itemData = useSelector(state => state.todoLists.todoLists.items).find(obj=> obj._id === dataInfo?.item?._id);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    console.log(dataInfo);

    React.useEffect(() => {
        //console.log("USE EFFECT");
    });

    function Start(){

    }

    function dateObj(){
        return new Date(dataInfo.item.updatedAt);
    }


    function Confirm(){
        dispatch(setIsEditing(false));
        console.log({ ...itemData, 
            ...{"title": title,
                "description": description ? description : itemData.description,}
            })


        try{
            axios.patch(`/todolist/${itemData._id}`, { ...itemData, 
            ...{"title": title ? title : itemData.title,
                "description": description ? description : itemData.description,}
            }).then(state=>{
                    dispatch(fetchTodoLists());
                }
            )
            
        }catch(err){
            console.log(err);
        }
        setTitle("");
        setDescription("");
    }

    function Cancel(){
        console.log(dataInfo);
        dispatch(setIsEditing(false));
        setTitle("");
        setDescription("");
        dispatch(setData({
        item: dataInfo.item,
        action: dataInfo.item === {} ? 'showData' : '',
        }))
    }

    function ConfirmCreate(){
        try{
            axios.post('/todolist', {
                title,
                description,
                haveAccess: [accInfo.data._id],
            }).then(state => {
                dispatch(fetchTodoLists());
            })
        } catch(err){

        }
    }


    function TitleChange(e){
        setTitle(title => e.target.value);
    }

    function DescriptionChange(e){
        setDescription(description => e.target.value);
    }

    function Click(){
        
    }

    return(
        <div onClick={Click} className={module.panel}>
            {dataInfo.action === 'showData' ? (
                <>
                <div className={module.header}>
                    <h1 className={module.panelName}>Data</h1>
                    <div className={module.date}>
                        <h2 className={module.dateDay}>{`${dateObj().getDate()} ${Month[dateObj().getMonth()]}.`}</h2>
                        <h2 className={module.dateTime}>{`${dateObj().getHours()}:${dateObj().getMinutes() < 10 ? "0"+dateObj().getMinutes() : dateObj().getMinutes()}`}</h2>
                    </div>
                </div>
                    <Charts task={dataInfo.item.toDo.length} inProgress={dataInfo.item.toCall.length} done={dataInfo.item.toGet.length} width="20px"/>
                </>
            ) : dataInfo.action === 'setData' ? (
                <div className={module.setData}>
                    <h1 className={module.textMod}>Edit</h1>
                    <h1 className={module.text}>Title:</h1>
                    <input
                    className={module.input}
                    onChange={TitleChange}
                    type="text" id="title"
                    placeholder={dataInfo.item.title}></input>

                    <h1 className={module.text}>Description:</h1>
                    {/* <h1 className={module.textMod}>{!description ? dataInfo.item.description : description}</h1> */}
                    <textarea className={module.textarea}
                    onChange={DescriptionChange}
                     type="text" id="title"></textarea>
                    <div className={module.menuButtons}>
                        <button className={module.button} onClick={Confirm}>Confirm</button>
                        <button className={module.button} onClick={Cancel}>Cancel</button>
                    </div>
                </div>

            ) : dataInfo.action === 'createData' ?(
                <div className={module.setData}>
                <h1 className={module.textMod}>Create</h1>
                <h1 className={module.text}>Title:</h1>
                <input
                className={module.input}
                onChange={TitleChange}
                type="text" id="title"></input>

                <h1 className={module.text}>Description:</h1>
                {/* <h1 className={module.textMod}>{!description ? dataInfo.item.description : description}</h1> */}
                <textarea className={module.textarea}
                onChange={DescriptionChange}
                 type="text" id="title"></textarea>
                <div className={module.menuButtons}>
                    <button className={module.button} onClick={ConfirmCreate}>Create</button>
                    <button className={module.button} onClick={Cancel}>Cancel</button>
                </div>
            </div>
            ) : (
            <></>
            )
        }
        </div>
    )
}

export default DataPanel;