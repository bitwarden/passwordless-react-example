import { Link } from 'react-router-dom';

import classes from './Menu.module.css';

function Menu() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}></div>
            <nav>
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/'>Public</Link></li>
                    <li><Link to='/user'>User</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Menu;