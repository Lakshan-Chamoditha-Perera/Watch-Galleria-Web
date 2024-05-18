import { Button } from "@nextui-org/react";
import "./App.css";
import React from "react";
import Header from "./components/header/Header";
import Products from "./components/cards/simple-product/Products";


function App() {

  return (
    <>
      <Header />
      <Products/>
    </>
  );
}

export default App;

