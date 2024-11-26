import { useEffect, useState } from 'react';
import styles from './BlackFridayHero.module.css';

const BlackFridayHero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Función para calcular el tiempo restante
    const calculateTimeLeft = () => {
        const blackFridayDate = new Date('2024-11-29T00:00:00'); // Fecha del Black Friday
        const now = new Date();
        const difference = blackFridayDate - now;

        if (difference > 0) {
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        } else {
            setTimeLeft({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
        }
    };

    // Actualizar el contador cada segundo
    useEffect(() => {
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer); // Limpiar el intervalo al desmontar el componente
    }, []);

    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={`${styles.title} animate-pulse`}>BLACK FRIDAY</h1>
                    <p className={styles.subtitle}>
                        Hasta <span className={styles.highlight}>70% OFF</span> en productos seleccionados
                    </p>
                    <div className={styles.countdown}>
                        <div className={styles.countdownItem}>
                            <span className={styles.countdownValue}>{timeLeft.days}</span>
                            <span className={styles.countdownLabel}>Días</span>
                        </div>
                        <div className={styles.countdownItem}>
                            <span className={styles.countdownValue}>{timeLeft.hours}</span>
                            <span className={styles.countdownLabel}>Horas</span>
                        </div>
                        <div className={styles.countdownItem}>
                            <span className={styles.countdownValue}>{timeLeft.minutes}</span>
                            <span className={styles.countdownLabel}>Minutos</span>
                        </div>
                        <div className={styles.countdownItem}>
                            <span className={styles.countdownValue}>{timeLeft.seconds}</span>
                            <span className={styles.countdownLabel}>Segundos</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlackFridayHero;
