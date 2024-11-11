import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/index.js'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <CartProvider>
      <App />
    </CartProvider>
  </Provider>
  // </StrictMode>,
)
