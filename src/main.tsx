// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom/client";
import {NextUIProvider} from '@nextui-org/react';
import './index.css'
import App from "./App";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./config/firebase";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
initializeApp(firebaseConfig);

root.render(
    <React.StrictMode> <NextUIProvider>
    <App/>
</NextUIProvider>
</React.StrictMode>);