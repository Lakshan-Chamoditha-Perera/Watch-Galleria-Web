import React, { useState, createContext, useContext } from "react";
import { WatchDto } from "../util/dto/watch.dto";

interface ShopContextProps {
    cart: WatchDto[];
    total: number;
    addToCart: (product: WatchDto) => void;
    setCart: React.Dispatch<React.SetStateAction<WatchDto[]>>;
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState<WatchDto[]>([]);
    const [total, setTotal] = useState(0);

    const addToCart = (product: WatchDto) => {
        if (cart.find((item) => item.itemCode === product.itemCode)) {
            throw new Error('Item already in cart');
        }
        setCart([...cart, product]);
        setTotal(total + product.price);
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
