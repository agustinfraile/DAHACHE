// WhatsAppButton.jsx
import styles from './WhatsAppButton.module.css';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ nombre, precio }) => {
    const location = useLocation();
    const productUrl = `${window.location.origin}${location.pathname}`;
    const YOUR_PHONE_NUMBER = "+5493815537013";
    const message = `
        Hola! Quiero consultar sobre este producto:
  
        Nombre: ${nombre}
        Precio: ${precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}

        Link: ${productUrl}
    `;

    const whatsappLink = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
        >
            <FaWhatsapp size={20} style={{ marginRight: '8px' }} />
            Consultar producto
        </a>
    );
};

export default WhatsAppButton;
