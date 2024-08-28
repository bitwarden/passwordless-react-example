import {createContext, useEffect, useState} from 'react';
import Session from "./Session.ts";
import {decodeJwt, isTokenExpired} from "./TokenUtility.ts";
import JwtToken from "./JwtToken.ts";

export interface AuthContextProps {
    session: Session | undefined;
    isAuthenticated: boolean;
    checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [session, setSession] = useState<Session | undefined>();

    const checkAuthStatus = () => {
        const jwt = localStorage.getItem('token');

        if (jwt && !isTokenExpired(jwt)) {
            setIsAuthenticated(true);
            const jwtToken: JwtToken = decodeJwt(jwt);
            const s = new Session();
            s.username = jwtToken.unique_name;
            s.userId = jwtToken.nameid;
            setSession(s);
        } else {
            setIsAuthenticated(false);
            setSession(undefined);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus, session }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;