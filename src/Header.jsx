import { Link } from 'react-router-dom';
import module from './Header.module.css';

import { isAuth, logout } from './redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';

function Header(){
    const dispatch = useDispatch();
    const userIsAuth = useSelector(isAuth);

    function logoutFunc()
    {
        dispatch(logout());
    }
    
    return(
        <div className={module.header}>
            <div className={module.wrapper}>
                <Link className={module.logo} to="/">
                    Daily Task
                </Link>
                <div className={module.headerNav}>
                    <a className={module.navLink}>How use</a>
                    <a className={module.navLink}>About</a>
                    <a className={module.navLink}>GIT</a>
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