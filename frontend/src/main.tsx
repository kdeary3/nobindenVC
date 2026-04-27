import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // No extension
import 'bootstrap/dist/css/bootstrap.min.css' // CSS extensions are OK

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)