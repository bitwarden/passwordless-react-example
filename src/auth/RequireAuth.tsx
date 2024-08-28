import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth.ts";

const RequireAuth = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return (
        isAuthenticated === true
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;