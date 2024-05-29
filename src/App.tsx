import React from 'react';
import { createContext } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PurchesOrder from "./views/watches/PurchesOrder";
import AddProductForm from "./views/watches/AddProductForm";
import SignInPage from "./views/users/SignInPage";
import SignupPage from "./views/users/SignupPage";
import Common from "./views/Common";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";

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
                        <Route path="/add-product" element={<AddProductForm />} />
                        <Route path="/purchases" element={<PurchesOrder />} />
                    </Routes>
                    <Footer />
                </Router>
            </ShopProvider>
        </AuthProvider>);
}

export default App;
