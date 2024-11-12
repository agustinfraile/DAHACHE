import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <h1 className={styles.logo}>DAHACHE</h1>
            </Link>

            {/* Icono de menú para dispositivos móviles */}
            <div className={styles.menuIcon} onClick={toggleMenu}>
                ☰
            </div>

            {/* Links de navegación */}
            <nav className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
                <Link to="/coleccionhombre" onClick={() => setIsMenuOpen(false)}>Colección Hombre</Link>
                <Link to="/coleccionmujer" onClick={() => setIsMenuOpen(false)}>Colección Mujer</Link>
            </nav>
        </header>
    );
};

export default Navbar;
