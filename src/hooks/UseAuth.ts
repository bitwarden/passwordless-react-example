import { useContext } from 'react';
import AuthProvider, { AuthContextProps } from '../auth/AuthProvider.tsx';

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthProvider);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export default useAuth;