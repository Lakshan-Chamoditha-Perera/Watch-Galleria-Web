import React, { createContext, useState, useContext, ReactNode } from 'react';

export  interface User {
    _id: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
    address: {
        city: string;
        postalCode: string;
        residentialAddress: string;
    };
    mobileNumber: string;
    createdAt: string;
}

interface AuthContextProps {
    user: User | null;
    isLogged: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateToken: (token: string) => void;
    updateUser: (userData: User) => void;
    token: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const login = (userData: User) => {
        console.log("AuthProvider: login {}", userData);
        setUser(userData);
        setIsLogged(true);
    };

    const logout = () => {
        console.log("AuthProvider: logout {}");
        setUser(null);
        setIsLogged(false);
        setToken("");
    };

    const updateToken = (token: string) => {
        console.log("AuthProvider: updateToken {}: ", token);
        setToken(token);
    };

    const updateUser = (userData: User) => {
        console.log("AuthProvider: updateUser {}", userData);
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, isLogged, login, logout, updateToken, updateUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
