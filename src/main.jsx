import './index.css'

import {AuthProvider} from "./components/AuthProvider/AuthProvider";
import { BrowserRouter } from 'react-router-dom'
import { PlatformApp } from './PlatformApp.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
        <BrowserRouter>
          <PlatformApp />      
        </BrowserRouter>
     </AuthProvider>
  </React.StrictMode>,
)
