import { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const addToCart = (product, color, size, quantity) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) =>
                    item._id === product._id &&
                    item.color === color &&
                    item.size === size
            );

            if (existingProduct) {
                return prevCart.map((item) =>
                    item._id === product._id &&
                        item.color === color &&
                        item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [
                    ...prevCart,
                    {
                        ...product,
                        color,
                        size,
                        quantity,
                    },
                ];
            }
        });

        setIsModalOpen(true);
    };

    const deleteProductCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) =>
                    item._id === product._id &&
                    item.color === product.color &&
                    item.size === product.size
            );

            if (existingProduct && existingProduct.quantity > 1) {
                // Si la cantidad es mayor a 1, reduce en 1
                return prevCart.map((item) =>
                    item._id === product._id &&
                        item.color === product.color &&
                        item.size === product.size
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                // Si la cantidad es 1, elimina el producto del carrito
                return prevCart.filter(
                    (item) =>
                        !(
                            item._id === product._id &&
                            item.color === product.color &&
                            item.size === product.size
                        )
                );
            }
        });
    };

    const clearCart = () => setCart([]);

    const calculateTotalItem = (product) => product.quantity * product.precio_venta;

    const deleteProduct = (product) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) =>
                    !(item._id === product._id && item.color === product.color && item.size === product.size)
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                clearCart,
                deleteProductCart,
                calculateTotalItem,
                deleteProduct,
                isModalOpen,
                toggleModal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
