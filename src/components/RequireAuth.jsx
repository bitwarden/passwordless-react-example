import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

function hasMatchingRole(allowedRoles, userRoles) {
    if (!allowedRoles || allowedRoles.length === 0) {
        return true;
    }

    for (let i = 0; i < allowedRoles.length; i++) {
        if (userRoles.indexOf(allowedRoles[i]) !== -1) {
            return true;
        }
    }

    return false;
}


const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    let isAllowed = true;

    if (allowedRoles) {
        if (auth?.verifiedToken?.jwt) {
            const decodedToken = jwtDecode(auth.verifiedToken.jwt);
            isAllowed = hasMatchingRole(allowedRoles, decodedToken.role);
        } else {
            isAllowed = false;
        }
    }

    return (
        isAllowed
            ? <Outlet />
            : auth?.verifiedToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;