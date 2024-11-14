// PromotionSection.jsx
import React from 'react';
import styles from './PromotionSection.module.css';
import { FaCreditCard, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PromotionSection = () => {
    return (
        <section className={styles.promotionSection}>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{"Aprovecha nuestras promociones".toLocaleUpperCase()}</h1>
                    <div className={styles.promotions}>
                        <div className={styles.promotionItem}>
                            <FaCreditCard className={styles.icon} />
                            <h2 className={styles.subtitle}>3 Cuotas Sin Interés</h2>
                            <p className={styles.description}>En todas tus compras</p>
                        </div>
                        <div className={styles.promotionItem}>
                            <FaDollarSign className={styles.icon} />
                            <h2 className={styles.subtitle}>Promociones especiales</h2>
                            <p className={styles.description}>En efectivo y transferencia</p>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Link to="/coleccionhombre" className={styles.button}>Colección Hombre</Link>
                        <Link to="/coleccionmujer" className={styles.button}>Colección Mujer</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionSection;
