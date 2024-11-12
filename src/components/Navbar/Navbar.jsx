// Navbar.jsx
import { useState } from 'react';
import styles from './Navbar.module.css';

import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import SlideCart from '../SlideCart/SlideCart';

const Navbar = () => {
    const { cart, isModalOpen, toggleModal } = useCart();

    return (
        <header className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <h1 className={styles.logo}>DAHACHE</h1>
            </Link>
            <nav className={styles.navLinks}>
                <Link to="/coleccionhombre">Colección Hombre</Link>
                <Link to="/coleccionmujer">Colección Mujer</Link>

                <div className={styles.navbar_container_menuOptions__cart}>
                    <div className={styles.cartContainer} onClick={toggleModal}>
                        {cart.length > 0 ? <p>🛒 {cart.length}</p> : <p>🛒</p>}
                    </div>
                    {isModalOpen && (
                        <>
                            <div className={styles.sliderOverlay} onClick={toggleModal} />
                            <SlideCart onClose={toggleModal} />
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;