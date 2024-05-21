import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Common from "./views/Common";
import ManageProducts from "./views/watches/AddProductForm";
import AddProductForm from "./views/watches/AddProductForm";
import PurchesOrder from "./views/watches/PurchesOrder";

function App() {
    return (
        <div>
            <Header />
            <div className="w-full h-[8vh]"></div>
            <Common />
            {/* <ManageProducts /> */}
            <AddProductForm />
            <PurchesOrder />
        </div>
    );
}

export default App;