// ProductDetail.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductById } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.selectedProduct);

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

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

            {/* Selección de talla */}
            <div className={styles.productOptions}>
              <div className={styles.optionGroup}>
                <label>Tamaño</label>
                <ul className={styles.sizeList}>
                  {selectedProduct.variantes.map((variant, index) => (
                    <li key={index} className={styles.sizeOption}>{variant.talla}</li>
                  ))}
                </ul>
              </div>

              {/* Selección de color */}
              <div className={styles.optionGroup}>
                <label>Color</label>
                <ul className={styles.colorList}>
                  {selectedProduct.variantes.map((variant, index) => (
                    <li key={index} className={styles.colorOption}>{variant.color}</li>
                  ))}
                </ul>
              </div>
            </div>

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
            <button className={styles.addToCartButton}>Añadir al carrito</button>
          </div>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ProductDetail;
