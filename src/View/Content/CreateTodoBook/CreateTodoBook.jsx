import module from'./CreateTodoBook.module.css';
import { setIsEditing } from '../../../redux/slices/editing';
import {setData} from '../../../redux/slices/dataInfo';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateTodoBook(props){
    const dispatch = useDispatch();
    const {dataInfo} = useSelector(state => state.dataInfo);

    function Create(){
        dispatch(setIsEditing(true));
        dispatch(setData({
            item: dataInfo.item,
            action: 'createData',
        }));
    }

    return(
        <div className={module.add}>
            <div onClick={Create} className={module.plusWrapper}>
                <div className={module.plus2}></div>
                <div className={module.plus}></div>
            </div>
        </div>
    )
}