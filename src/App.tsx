import React from 'react';
import { createContext } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PurchaseOrders from "./views/watches/PurchesOrder";
import ManageProducts from "./views/watches/AddProductForm";
import SignInPage from "./views/users/SignInPage";
import SignupPage from "./views/users/SignupPage";
import Common from "./views/Common";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import { ManageAccounts } from '@mui/icons-material';
import ManageUserPage from './views/users/ManageUserPage';

export const Context = createContext(null);

function App() {
    return (
        <AuthProvider>
            <ShopProvider>
                <Router>
                    <Header />
                    <div className="w-full h-[8vh]"></div>
                    <Routes>
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/home" element={<Common />} />
                        <Route path="/add-product" element={<ManageProducts />} />
                        <Route path="/purchases" element={<PurchaseOrders />} />
                        <Route path="/profile" element={<ManageUserPage />} />
                    </Routes>
                    <Footer />
                </Router>
            </ShopProvider>
        </AuthProvider>);
}

export default App;
