import { useEffect, useState } from 'react';
import styles from './BlackFridayHero.module.css';

const BlackFridayHero = () => {


    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={`${styles.title} animate-pulse`}>LLEGÓ EL BLACK FRIDAY</h1>
                    <p className={styles.subtitle}>
                        Descuentos en <span className={styles.highlight}>todos los productos</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BlackFridayHero;
