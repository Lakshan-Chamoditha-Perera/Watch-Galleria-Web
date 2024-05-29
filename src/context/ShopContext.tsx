import React, { useState, createContext, useContext, useMemo } from "react";
import { WatchDto } from "../util/dto/watch.dto";

const ShopContext = createContext({
    cart: [],
    total: 0,
    addToCart: (product: WatchDto) => { },
});

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState<WatchDto[]>([]);
    const [total, setTotal] = useState(0);

    const addToCart = (product: WatchDto) =>  {
        if (cart.find((item) => item.itemCode === product.itemCode)) {
            console.log('Item already in cart');
            throw new Error('Item already in cart');
        }
        setCart((prevCart) => [...prevCart, product]);
        setTotal((prevTotal) => prevTotal + product.price);
    };

    const value = useMemo(() => ({ cart, total, addToCart }), [cart, total]);

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a ShopProvider");
    }
    return context;
};
