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
        // Encontrar el stock disponible para esta variante específica (color y talla)
        const variant = product.variantes.find(
            (variant) => variant.color === color && variant.talla === size
        );

        if (!variant) {
            console.warn('Variante no encontrada');
            return;
        }

        const stockDisponible = variant.stock;

        // Calcular la cantidad total en el carrito para esta variante
        const existingProductInCart = cart.find(
            (item) => item._id === product._id && item.color === color && item.size === size
        );

        const cantidadEnCarrito = existingProductInCart ? existingProductInCart.quantity : 0;

        // Verificar si la cantidad total deseada supera el stock
        if (cantidadEnCarrito + quantity > stockDisponible) {
            alert(`Ya has agregado el máximo de ${stockDisponible} unidades para esta variante.`);
            return;
        }

        // Proceder a agregar al carrito
        setCart((prevCart) => {
            if (existingProductInCart) {
                return prevCart.map((item) =>
                    item._id === product._id && item.color === color && item.size === size
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

        setIsModalOpen(true); // Abrir el SlideCart automáticamente
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
                return prevCart.map((item) =>
                    item._id === product._id &&
                    item.color === product.color &&
                    item.size === product.size
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
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
