import { Button } from "@nextui-org/react";
import "./App.css";
import React from "react";


function App() {

  return (
    <div>
      <Button color="primary" onClick={() => {
        alert('Hello World')
      }}>
        Button
      </Button>
    </div>
  );
}

export default App;
