import styles from './Footer.module.css';
import { FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {

    const email = "contacto@dahache.com";
    const facebook = "https://www.facebook.com/profile.php?id=61569154731273";
    const instagram = "https://www.instagram.com/dahache.ar/";

    return (
        <footer className={styles.footer}>
            <div className={styles.iconContainer}>
                <a href={`mailto:${email}`} className={styles.iconLink}>
                    <FaEnvelope className={styles.icon} />
                </a>
                <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                    <FaInstagram className={styles.icon} />
                </a>
                <a href={facebook} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                    <FaFacebook className={styles.icon} />
                </a>
            </div>
            <p className={styles.copy}>&copy; 2024 DAHACHE. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
