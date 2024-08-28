import { Link } from 'react-router-dom';
import classes from './Menu.module.css';
import useAuth from "../hooks/UseAuth.ts";
import {AuthContextProps} from "../auth/AuthProvider.tsx";

const Menu = () => {
    const auth: AuthContextProps = useAuth();

    return (
        <header className={classes.header}>
            <div className={classes.logo}></div>
            <nav>
                {(auth.isAuthenticated === true)
                    ? (
                        <ul>
                            <li><Link to='/profile'>Profile</Link></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/'>Public</Link></li>
                        </ul>
                    )
                }
            </nav>
        </header>
    );
}

export default Menu;