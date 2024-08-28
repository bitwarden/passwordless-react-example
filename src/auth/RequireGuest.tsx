import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth.ts";

const RequireGuest = () => {
    const session = useAuth();
    const location = useLocation();

    return (
        session.isAuthenticated === false
            ? <Outlet />
            : <Navigate to="/profile" state={{ from: location }} replace />
    );
}

export default RequireGuest;