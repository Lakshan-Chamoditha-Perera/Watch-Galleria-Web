import React from 'react';
import { createContext } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PurchaseOrders from "./views/watches/purchase_order/PurchesOrder";
import ManageProducts from "./views/watches/manage_product/AddProductForm";
import SignInPage from "./views/users/SignInPage";
import SignupPage from "./views/users/SignupPage";
import Common from "./views/util/Common";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import { ManageAccounts } from '@mui/icons-material';
import ManageUserPage from './views/users/ManageUserPage';
import PurchaseSuccess from './views/watches/purchase_order/PurchaseSuccess';
import NotFoundPage from './views/util/NotFoundPage';
import SalesView from './views/users/Sales';
import Sales from './views/users/Sales';
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
                        <Route path="/" element={<Common />} />
                        <Route path="/add-product" element={<ManageProducts />} />
                        <Route path="/purchases" element={<PurchaseOrders />} />
                        <Route path="/profile" element={<ManageUserPage />} />
                        <Route path="/purchases/success" element={<PurchaseSuccess />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Footer />
                </Router>
            </ShopProvider>
        </AuthProvider>);
}

export default App;
