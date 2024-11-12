// Cuotas.jsx
import styles from './Cuotas.module.css';

const Cuotas = ({ cuotas=3, colorFondo="#D6C292" }) => {
    return (
        <div className={styles.cuotasContainer} style={{ backgroundColor: colorFondo }}>
            <p>{cuotas} cuotas sin interés</p>
        </div>
    );
};

export default Cuotas;
