import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { WatchDto } from "../util/dto/watch.dto";

interface ShopContextProps {
    cart: WatchDto[];
    total: number;
    addToCart: (product: WatchDto) => void;
    setCart: React.Dispatch<React.SetStateAction<WatchDto[]>>;
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<WatchDto[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Load cart from localStorage when the component mounts
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart) as WatchDto[];
            setCart(parsedCart);
            const initialTotal = parsedCart.reduce((acc, item) => acc + item.price * item.addToCartQuantity, 0);
            setTotal(initialTotal);
        }
    }, []);

    useEffect(() => {
        // Update total whenever cart changes
        const newTotal = cart.reduce((acc, item) => acc + item.price * item.addToCartQuantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product: WatchDto) => {
        if (cart.find((item) => item.itemCode === product.itemCode)) {
            throw new Error('Item already in cart');
        }
        const newCart = [...cart, product];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <ShopContext.Provider value={{ cart, total, addToCart, setCart }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useCart must be used within a ShopProvider');
    }
    return context;
};
