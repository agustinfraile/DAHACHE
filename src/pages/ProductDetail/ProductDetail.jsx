import styles from './ProductDetail.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Cuotas from '../../components/Cuotas/Cuotas';
import DescuentoContado from '../../components/DescuentoContado/DescuentoContado';

const ProductDetail = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products);

  // Buscar el producto con el `productId` en el array de productos
  const selectedProduct = products.find((product) => product.id_producto === productId);

  if (!selectedProduct) {
    return <p>Producto no encontrado.</p>;
  }
  // Calcular el valor de cada cuota
  const cuotasSinInteres = selectedProduct.cuotas_sin_interes || 3;
  const valorCuota = (selectedProduct.precio_venta / cuotasSinInteres).toFixed(2);

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
          {/* Precio con fondo azul */}
          <div className={styles.productPriceContainer}>
            ${selectedProduct.precio_venta.toLocaleString('es-AR')}
          </div>
          <p className={styles.productDescription}>{selectedProduct.descripcion}</p>
          {/* Cuotas sin interés y cálculo de cuota mensual */}
          <Cuotas />
          <p className={styles.cuotaMensual}>Cuota mensual: ${valorCuota}</p>

          {/* Descuento por pago en efectivo */}
          <DescuentoContado
            precioVenta={selectedProduct.precio_venta}
            precioContado={selectedProduct.precio_contado}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
