import styles from './DescuentoEspecialProducto.module.css';

const DescuentoEspecialProducto = ({ precioAnterior, precioActual }) => {
    const precioAnteriorFormateado = precioAnterior
        ? precioAnterior.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
        : 'N/A';
    const precioActualFormateado = precioActual
        ? precioActual.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
        : 'N/A';

    return (
        <div className={styles.descuentoContainer}>
            {precioAnterior && (
                <span className={styles.precioAnterior}>
                    <del>{precioAnteriorFormateado}</del>
                </span>
            )}
            {precioActual && (
                <span className={styles.precioActual}>{precioActualFormateado}</span>
            )}
        </div>
    );
};

export default DescuentoEspecialProducto;
