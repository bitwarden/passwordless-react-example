import {ReactNode} from 'react';
import Menu from './Menu';
import classes from './Layout.module.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Menu />
            <main className={classes.main}>{children}</main>
        </div>
    );
}

export default Layout;