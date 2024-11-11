// Navbar.jsx
import { useState } from 'react';
import styles from './Navbar.module.css';

import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import SlideCart from '../SlideCart/SlideCart';

const Navbar = () => {
    const { cart, addToCart } = useCart();
    const [showSlider, setShowSlider] = useState(false);

    const toggleSlider = () => {
        setShowSlider(!showSlider);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setShowSlider(true); // Abrir el SlideCart automáticamente
    };

    return (
        <header className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <h1 className={styles.logo}>DAHACHE</h1>
            </Link>
            <nav className={styles.navLinks}>
                <Link to="/coleccionhombre">Colección Hombre</Link>
                <Link to="/coleccionmujer">Colección Mujer</Link>

                <div className={styles.navbar_container_menuOptions__cart}>
                    <div
                        className={styles.cartContainer}
                        onClick={toggleSlider}
                    >
                        {cart.length > 0 ? <p>🚀</p> : <p>🛒</p>}
                    </div>
                    {showSlider && (
                        <div
                            className={styles.sliderOverlay}
                            onClick={toggleSlider}
                        />
                    )}
                    {showSlider && (
                        <SlideCart onClose={toggleSlider} />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
