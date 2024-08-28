import {useEffect} from 'react'
import './App.css'
import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import PublicPage from "./pages/PublicPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import useAuth from "./hooks/UseAuth.ts";
import RequireGuest from "./auth/RequireGuest.tsx";

const App = () => {
    const { checkAuthStatus } = useAuth();

    useEffect(() => {
        // Check if the user is authenticated when the app loads
        checkAuthStatus();
    }, []);

    return (
        <Layout>
            <Routes>
                <Route element={<RequireGuest />}>
                    <Route path="/" element={ <PublicPage/> } />
                    <Route path="/register" element={ <RegisterPage/> } />
                    <Route path="/login" element={ <LoginPage/> } />
                </Route>

                <Route path="unauthorized" element={<UnauthorizedPage />} />

                <Route element={<RequireAuth />}>
                    <Route path="/profile" element={ <ProfilePage/> } />
                </Route>
            </Routes>
        </Layout>
    );
}


export default App;