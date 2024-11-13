import styles from './ProductDetail.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Cuotas from '../../components/Cuotas/Cuotas';
import DescuentoContado from '../../components/DescuentoContado/DescuentoContado';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

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
  const valorCuota = (selectedProduct.precio_venta / cuotasSinInteres).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  // Precio formateado sin decimales para el fondo azul
  const precioSinDecimales = Math.floor(selectedProduct.precio_venta).toLocaleString('es-AR');

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
                <Zoom>
                  <img src={foto} alt={`Foto ${index + 1}`} className={styles.productImage} />
                </Zoom>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Detalles del producto */}
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{selectedProduct.nombre}</h1>
          {/* Precio con fondo azul, sin decimales */}
          <div className={styles.productPriceContainer}>
            ${precioSinDecimales}
          </div>
          <p className={styles.productDescription}>{selectedProduct.descripcion}</p>
          {/* Cuotas sin interés y cálculo de cuota mensual */}
          <Cuotas />
          <p className={styles.cuotaMensual}>Cuota mensual: {valorCuota}</p>

          {/* Descuento por pago en efectivo */}
          <DescuentoContado
            precioVenta={selectedProduct.precio_venta}
            precioContado={selectedProduct.precio_contado}
          />

          {/* Botón de WhatsApp */}
          <WhatsAppButton nombre={selectedProduct.nombre} precio={selectedProduct.precio_venta} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
