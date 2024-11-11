import useCart from '../../hooks/useCart';

import { Link } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';
import styles from './SlideCart.module.css';

const SlideCart = ({ onClose }) => {
    const { cart, clearCart, calculateTotalItem } = useCart();

    const calculateCartTotal = () => {
        return cart.reduce((total, product) => total + (product.precio_venta * product.quantity), 0);
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.sliderContainer_button}>
                <div onClick={onClose} className={styles.closeBtn}>X</div>
            </div>
            <div className={styles.sliderContainer_title}>
                <p className={styles.titleNavCart}>
                    <Link to='/cart' onClick={onClose}>Ir a pagar</Link>
                </p>
            </div>

            {cart.length > 0 ? (
                <div>
                    <h3>Total: ${calculateCartTotal().toLocaleString('es-AR')}</h3>
                    <div>
                        <button onClick={clearCart}>Limpiar carrito</button>
                    </div>
                </div>
            ) : (
                <p>No hay productos en el carrito</p>
            )}

            <div className={styles.sliderItems}>
                <ul className={styles.sliderItems_list}>
                    {cart.map((product) => (
                        <CartItem
                            key={`${product._id}-${product.color}-${product.size}`}
                            image={product.fotos[0]}
                            precio_venta={product.precio_venta}
                            name={product.nombre}
                            quantity={product.quantity}
                            id={product._id}
                            stock={product.variantes.find(variant => variant.color === product.color && variant.talla === product.size)?.stock || 0}
                            color={product.color}
                            size={product.size}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SlideCart;