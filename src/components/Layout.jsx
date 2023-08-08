import Menu from './Menu';
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div>
            <Menu />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;