import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Common from "./views/Common";
import ManageProducts from "./views/watches/AddProductForm";
import AddProductForm from "./views/watches/AddProductForm";
import PurchesOrder from "./views/watches/PurchesOrder";
import Footer from "./components/footer/Footer";
import SignupPage from "./views/users/SignupPage";
import SignInPage from "./views/users/SignInPage";

function App() {
   
    return (
        <Router>
          <Header />
          <div className="w-full h-[8vh]"></div>
          <Routes>
            <Route path="/" element={<Common />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/add-product" element={<AddProductForm />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/purchases" element={<PurchesOrder />} />
          </Routes>
          <Footer />
        </Router>
      );
}

export default App;