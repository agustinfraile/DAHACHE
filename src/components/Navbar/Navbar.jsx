// Navbar.jsx
import styles from './Navbar.module.css';

import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <header className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <h1 className={styles.logo}>DAHACHE</h1>
            </Link>
            <nav className={styles.navLinks}>
                <Link to="/coleccionhombre">Colección Hombre</Link>
                <Link to="/coleccionmujer">Colección Mujer</Link>
            </nav>
        </header>
    );
};

export default Navbar;