import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the User interface
export interface User {
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

// Define the context properties
interface AuthContextProps {
    user: User | null;
    isLogged: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateToken: (token: string) => void;
    updateUser: (userData: User) => void;
    token: string;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>('');
    const [isLogged, setIsLogged] = useState<boolean>(false);

    // Retrieve user data and token from sessionStorage on component mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const storedToken = sessionStorage.getItem('token');
        const storedIsLogged = sessionStorage.getItem('isLogged');

        if (storedUser && storedToken && storedIsLogged === 'true') {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setIsLogged(true);
        }
    }, []);

    // Login function
    const login = (userData: User) => {
        console.log('AuthProvider: login', userData);
        setUser(userData);
        setIsLogged(true);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('isLogged', 'true');
        sessionStorage.setItem('token', token);
    };

    // Logout function
    const logout = () => {
        console.log('AuthProvider: logout');
        setUser(null);
        setIsLogged(false);
        setToken('');
        sessionStorage.clear();
        localStorage.clear();
    };

    // Update token function
    const updateToken = (newToken: string) => {
        console.log('AuthProvider: updateToken', newToken);
        setToken(newToken);
        sessionStorage.setItem('token', newToken);
    };

    // Update user data function
    const updateUser = (userData: User) => {
        console.log('AuthProvider: updateUser', userData);
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, isLogged, login, logout, updateToken, updateUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
