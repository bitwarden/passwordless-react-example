import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import PublicPage from "./pages/PublicPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequireAuth from "./components/RequireAuth";
import {ROLE_ADMIN, ROLE_USER} from "./constants/Roles";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Layout>
            <Routes>
                <Route exact path="/" element={ <PublicPage/> } />
                <Route path="/register" element={ <RegisterPage/> } />
                <Route path="/login" element={ <LoginPage/> } />
                <Route path="unauthorized" element={<UnauthorizedPage />} />

                <Route element={<RequireAuth allowedRoles={[ROLE_USER]} />}>
                    <Route path="/user" element={ <UserPage/> } />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLE_ADMIN]} />}>
                    <Route path="/admin" element={ <AdminPage/> } />
                </Route>
            </Routes>
        </Layout>
        );
    }
}

export default App;