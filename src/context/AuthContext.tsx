import React from 'react';
import { createContext, useState, useContext } from 'react';

interface AuthContextProps {
    user: any;
    isLogged: boolean;
    login: (userData: any) => void;
    logout: () => void;
    updateToken: (token: string) => void;
    token: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [isLogged, setIsLogged] = useState(false);

    const login = (userData) => {
        console.log("AuthProvidor : login {} ")
        setUser(userData);
        setIsLogged(true);
    };

    const logout = () => {
        console.log("AuthProvidor : logout {} ")
        setUser(null);
        setIsLogged(false);
        setToken("");
    };

    const updateToken = (token: string) => {
        console.log("AuthProvidor : updateToken {} : " + token)
        setToken(token);
    }

    return (
        <AuthContext.Provider value={{ user, isLogged, login, logout, updateToken, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
