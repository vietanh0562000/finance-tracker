import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { StrictMode } from 'react'
import App from './App'
import TransactionContextProvider from './context/TransactionContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <TransactionContextProvider>
           <App/>
        </TransactionContextProvider>
    </BrowserRouter>
  </StrictMode>
)
