import useCart from '../../hooks/useCart';
import styles from './CartItem.module.css';

export const CartItem = ({
    image,
    precio_venta,
    name,
    quantity,
    id,
    stock,
    color,
    size,
}) => {
    const { addToCart, deleteProductCart, deleteProduct } = useCart();

    const total = precio_venta * quantity;

    return (
        <li className={styles.item}>
            <img src={image} alt={name} className={styles.itemImg} />

            <div className={styles.itemName}>
                <strong>{name}</strong> - {color}, Talla: {size}
            </div>

            <div className={styles.itemPrice}>
                <strong>${precio_venta}</strong>
            </div>

            <div>
                <small>Cantidad: {quantity}</small>
                {quantity < stock ? (
                    <button onClick={() => addToCart({ _id: id, color, size, precio_venta }, color, size, 1)}>+</button>
                ) : (
                    <p>No se puede agregar más</p>
                )}
                <button onClick={() => deleteProductCart({ _id: id, color, size })}>-</button>
                <div>
                    <button onClick={() => deleteProduct({ _id: id, color, size })}>X</button>
                </div>
            </div>

            <div>
                <h4>Total: ${total.toLocaleString('es-AR')}</h4>
            </div>
        </li>
    );
};