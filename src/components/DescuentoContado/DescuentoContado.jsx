// DescuentoContado.jsx
import styles from './DescuentoContado.module.css';

const DescuentoContado = ({ precioVenta }) => {


    const porcentajeDescuento = 0.8;
    const precioDescuento = precioVenta * porcentajeDescuento;
    return (
        <div className={styles.descuentoContainer}>


            <p className={styles.descuentoEtiqueta}>Ahorra 10% EXTRA🔥🔥</p>
            <p className={styles.pagoEfectivo}>Pagando en efectivo o transferencia</p>
        </div>
    );
};

export default DescuentoContado;
