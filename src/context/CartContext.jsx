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
                // Si la variante ya existe en el carrito, incrementa la cantidad
                return prevCart.map((item) =>
                    item._id === product._id &&
                        item.color === color &&
                        item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Si la variante no existe en el carrito, la añade
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

        setIsModalOpen(true); // Abre el modal automáticamente al añadir un producto
    };

    const deleteProductCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item !== product));
    };

    const clearCart = () => setCart([]);

    const calculateTotalItem = (product) => product.quantity * product.price;

    const deleteProduct = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== product._id));
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
