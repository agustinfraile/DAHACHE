import{ useEffect, useState } from 'react';
import styles from './BlackFridayHero.module.css';

const BlackFridayHero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [headingText, setHeadingText] = useState('BLACK FRIDAY'); // Texto inicial del h1
    const [fade, setFade] = useState(false); // Controlar la animación de desvanecimiento

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

    // Función para alternar el texto del h1 con una transición suave
    const toggleHeadingText = () => {
        setFade(true); // Activar la animación de desvanecimiento
        setTimeout(() => {
            setHeadingText((prevText) =>
                prevText === 'BLACK FRIDAY' ? 'ESTÁ LLEGANDO...' : 'BLACK FRIDAY'
            );
            setFade(false); // Restaurar la opacidad tras el cambio
        }, 500); // Tiempo suficiente para completar el desvanecimiento
    };

    // Actualizar el contador cada segundo
    useEffect(() => {
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer); // Limpiar el intervalo al desmontar el componente
    }, []);

    // Alternar el texto del h1 cada 3 segundos
    useEffect(() => {
        const headingTimer = setInterval(toggleHeadingText, 3000); // Cambia cada 3 segundos
        return () => clearInterval(headingTimer); // Limpiar el intervalo al desmontar el componente
    }, []);

    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={`${styles.title} ${fade ? styles.fadeOut : styles.fadeIn}`}>
                        {headingText}
                    </h1>

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
