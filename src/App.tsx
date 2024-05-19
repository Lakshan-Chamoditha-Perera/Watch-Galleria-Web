import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Common from "./views/Common";

function App() {
    return (
        <div>
            <Header/>
            <div className="w-full h-[8vh]"></div>
            <Common/>
        </div>
    );
}

export default App;