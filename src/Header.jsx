import { Link, Navigate } from 'react-router-dom';
import module from './Header.module.css';

import { isAuth, logout } from './redux/slices/auth';
import { deleteTodoListsData } from './redux/slices/todoLists';
import { useDispatch, useSelector } from 'react-redux';
import { deleteData } from './redux/slices/dataInfo';

function Header(){
    const dispatch = useDispatch();
    const userIsAuth = useSelector(isAuth);

    function logoutFunc()
    {
        window.localStorage.removeItem('token');
        dispatch(logout());
        dispatch(deleteTodoListsData());
        dispatch(deleteData());

    }

    console.log(userIsAuth);
    
    return(
        
        <div className={module.header}>
            <div className={module.wrapper}>
                <Link className={module.logo} to="/">
                    Daily Things
                </Link>
                <div className={module.headerNav}>
                    {/* <a className={module.navLink}>How use</a>
                    <a className={module.navLink}>About</a> */}
                    <a target="_blank"  href='https://github.com/dinchedope' className={module.navLink}>GIT</a>
                    {userIsAuth ? 
                    (<a onClick={logoutFunc} className={module.navLink}>Sign out</a>) :
                    (<Link className={module.navLink} to="/login">
                        Sign in
                    </Link>)}
                    
                </div> 
            </div>
        </div>
    );
}

export default Header;