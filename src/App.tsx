import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Common from "./views/Common";
import ManageProducts from "./views/watches/AddProductForm";
import AddProductForm from "./views/watches/AddProductForm";
import PurchesOrder from "./views/watches/PurchesOrder";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div>
            <Header />
            <div className="w-full h-[8vh]"></div>
            <Common />
            {/* <ManageProducts /> */}
            <AddProductForm />
            <PurchesOrder />

            <Footer/>
        </div>
    );
}

export default App;