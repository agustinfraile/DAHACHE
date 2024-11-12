import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const ProductDetail = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products);

  // Buscar el producto con el `productId` en el array de productos
  const selectedProduct = products.find((product) => product.id_producto === productId);

  if (!selectedProduct) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productDetail}>
        {/* Carrusel de imágenes */}
        <div className={styles.imageCarousel}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            loop={true}
            className={styles.swiper}
          >
            {selectedProduct.fotos.map((foto, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
