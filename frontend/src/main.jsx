import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Footer from './Components/Footer.jsx'
import Navbar from './Components/Navbar.jsx'
import PartnersSection from './Components/PartnersSection .jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <App />
    <PartnersSection />
    <Footer/> 
  </StrictMode>,
)
