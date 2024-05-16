import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App.tsx'
import './index.css'

 const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
    <React.StrictMode>
        <NextUIProvider>
            <App />
        </NextUIProvider>
    </React.StrictMode>,
)