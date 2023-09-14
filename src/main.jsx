import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import {AuthProvider} from "./components/AuthProvider/AuthProvider";
import { BrowserRouter } from 'react-router-dom'
import { PlatformApp } from './PlatformApp.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
     <AuthProvider>
        <BrowserRouter>
            <ToastContainer />
            <PlatformApp />                  
        </BrowserRouter>
     </AuthProvider>
   // </React.StrictMode>,
)
