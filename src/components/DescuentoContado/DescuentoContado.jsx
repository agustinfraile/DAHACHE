// DescuentoContado.jsx
import styles from './DescuentoContado.module.css';

const DescuentoContado = ({ precioVenta, precioContado }) => {
    if (precioContado >= precioVenta) return null; // No mostrar el componente si no hay descuento

    const porcentajeDescuento = Math.round(((precioVenta - precioContado) / precioVenta) * 100);

    return (
        <div className={styles.descuentoContainer}>
            <p className={styles.precioOriginal}>${precioVenta.toLocaleString('es-AR')}</p>
            <p className={styles.precioContado}>${precioContado.toLocaleString('es-AR')}</p>
            <p className={styles.descuentoEtiqueta}>Ahorra {porcentajeDescuento}%🔥🔥</p>
            <p className={styles.pagoEfectivo}>Precio promocional pago en efectivo o transferencia</p>
        </div>
    );
};

export default DescuentoContado;
