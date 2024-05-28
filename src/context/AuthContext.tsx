import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    const login = (userData) => {
        console.log("------------------------------------------------------------------------------")
        console.log("AuthProvidor : login {} ")
        setUser(userData);
        console.log(userData)
        console.log("------------------------------------------------------------------------------")
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
