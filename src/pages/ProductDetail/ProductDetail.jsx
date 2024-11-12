import styles from './ProductDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductById } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useCart from '../../hooks/useCart';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const { addToCart, cart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [stock, setStock] = useState(null);
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(false);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, Math.min(prevQuantity + amount, stock || 1)));
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    const sizesForColor = selectedProduct.variantes.filter(variant => variant.color === color);
    setAvailableSizes(sizesForColor);
    setStock(sizesForColor[0]?.stock || 0);
    setQuantity(1);
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    const selectedVariant = availableSizes.find(variant => variant.talla === size && variant.color === selectedColor);
    setStock(selectedVariant?.stock || 0);
    setQuantity(1);
  };

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  // Verificar si el botón de añadir al carrito debe estar deshabilitado
  useEffect(() => {
    if (selectedProduct && selectedColor && selectedSize) {
      const variant = selectedProduct.variantes.find(
        (v) => v.color === selectedColor && v.talla === selectedSize
      );

      const stockDisponible = variant ? variant.stock : 0;
      const existingProductInCart = cart.find(
        (item) =>
          item._id === selectedProduct._id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      const cantidadEnCarrito = existingProductInCart ? existingProductInCart.quantity : 0;
      setIsAddToCartDisabled(cantidadEnCarrito >= stockDisponible);
    }
  }, [selectedProduct, selectedColor, selectedSize, cart]);

  const handleAddToCart = () => {
    if (selectedColor && selectedSize && quantity <= stock) {
      addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    } else {
      alert("Por favor, selecciona el color, la talla y asegúrate de que la cantidad no exceda el stock.");
    }
  };

  return (
    <div className={styles.productDetailContainer}>
      {selectedProduct ? (
        <div className={styles.productDetail}>
          {/* Carrusel de imágenes */}
          <div className={styles.imageCarousel}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              loop={true}
            >
              {selectedProduct.fotos && selectedProduct.fotos.map((foto, index) => (
                <SwiperSlide key={index}>
                  <img src={foto} alt={`Foto ${index + 1}`} className={styles.productImage} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Detalles del producto */}
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{selectedProduct.nombre}</h1>
            <p className={styles.productPrice}>${selectedProduct.precio_venta}</p>
            <p className={styles.productDescription}>{selectedProduct.descripcion}</p>

            {/* Selección de color */}
            <div className={styles.productOptions}>
              <div className={styles.optionGroup}>
                <label>Color</label>
                <ul className={styles.colorList}>
                  {[...new Set(selectedProduct.variantes.map(variant => variant.color))].map((color, index) => (
                    <li
                      key={index}
                      className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                      onClick={() => handleColorSelection(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                    >
                      {color}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selección de talla */}
              {selectedColor && (
                <div className={styles.optionGroup}>
                  <label>Tamaño</label>
                  <ul className={styles.sizeList}>
                    {availableSizes.map((variant, index) => (
                      <li
                        key={index}
                        className={`${styles.sizeOption} ${selectedSize === variant.talla ? styles.selected : ''}`}
                        onClick={() => handleSizeSelection(variant.talla)}
                      >
                        {variant.talla}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Mostrar stock según color y talla seleccionados */}
            {selectedColor && selectedSize && (
              <p className={styles.stockInfo}>Stock disponible: {stock}</p>
            )}

            {/* Control de cantidad */}
            <div className={styles.quantityControl}>
              <label>Cantidad</label>
              <div className={styles.quantityButtons}>
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            {/* Botón "Añadir al carrito" */}
            <button
              className={`${styles.addToCartButton} ${isAddToCartDisabled ? styles.disabled : ''}`}
              onClick={handleAddToCart}
              disabled={isAddToCartDisabled}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ProductDetail;
