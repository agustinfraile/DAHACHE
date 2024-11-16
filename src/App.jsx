import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import ManCollection from './pages/ManCollection/ManCollection'
import WomenCollection from './pages/WomenCollection/WomenCollection'
import Navbar from './components/Navbar/Navbar'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/coleccionhombre" element={<ManCollection />} />
        <Route path="/coleccionmujer" element={<WomenCollection />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
