import styles from './CartItem.module.css';

export const CartItem = ({
    image,
    precio_venta, // Recibe `precio_venta` del contexto
    name,
    quantity,
    id,
    stock,
    color,
    size,
    addToCart,
    deleteProductCart,
    calculateTotalItem,
    deleteProduct
}) => {
    const total = precio_venta * quantity; // Calcula el total usando `precio_venta`

    return (
        <li key={id} className={styles.item}>
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
                    <button onClick={addToCart}>+</button>
                ) : (
                    <p>No se puede agregar más</p>
                )}
                <button onClick={deleteProductCart}>-</button>
                <div>
                    <button onClick={deleteProduct}>X</button>
                </div>
            </div>

            <div>
                <h4>Total: ${total}</h4>
            </div>
        </li>
    );
};
