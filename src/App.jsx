import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import UserPage from "./pages/UserPage";
import PublicPage from "./pages/PublicPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequireAuth from "./components/RequireAuth";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
    render() {
        return (
        <Layout>
            <Routes>
                <Route exact path="/" element={ <PublicPage/> } />
                <Route path="/register" element={ <RegisterPage/> } />
                <Route path="/login" element={ <LoginPage/> } />
                <Route path="unauthorized" element={<UnauthorizedPage />} />

                <Route element={<RequireAuth />}>
                    <Route path="/user" element={ <UserPage/> } />
                </Route>
            </Routes>
        </Layout>
        );
    }
}

export default App;
