import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from "./contaxt/user_context.jsx";
import CaptainContext from './contaxt/captain_context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
  <UserContextProvider>
     <BrowserRouter>
    <App />
   </BrowserRouter>
  </UserContextProvider>
  </CaptainContext>
  </StrictMode>,
)
