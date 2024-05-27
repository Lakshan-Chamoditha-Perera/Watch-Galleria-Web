import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setIsLogged(true);
    };

    const logout = () => {
        setUser(null);
        setIsLogged(false);
    };



    return (
        <AuthContext.Provider value={{ user, isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);