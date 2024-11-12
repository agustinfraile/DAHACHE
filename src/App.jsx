import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ManCollection from './pages/ManCollection/ManCollection';
import WomenCollection from './pages/WomenCollection/WomenCollection';
import Navbar from './components/Navbar/Navbar';
import Checkout from './pages/Checkout/Checkout';

const MainContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/checkout' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/coleccionhombre" element={<ManCollection />} />
        <Route path="/coleccionmujer" element={<WomenCollection />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};


function App() {


  return (
    <>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </>
  )
}

export default App;
