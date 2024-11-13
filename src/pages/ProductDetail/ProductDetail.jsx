import styles from './ProductDetail.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-medium-image-zoom/dist/styles.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Cuotas from '../../components/Cuotas/Cuotas';
import DescuentoContado from '../../components/DescuentoContado/DescuentoContado';
import Zoom from 'react-medium-image-zoom';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

const ProductDetail = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products);

  const selectedProduct = products.find((product) => product.id_producto === productId);

  if (!selectedProduct) {
    return <p>Producto no encontrado.</p>;
  }

  const cuotasSinInteres = selectedProduct.cuotas_sin_interes || 3;
  const valorCuota = (selectedProduct.precio_venta / cuotasSinInteres).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  const precioSinDecimales = Math.floor(selectedProduct.precio_venta).toLocaleString('es-AR');

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productDetail}>
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

        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{selectedProduct.nombre}</h1>
          <div className={styles.productPriceContainer}>${precioSinDecimales}</div>
          <p className={styles.productDescription}>{selectedProduct.descripcion}</p>

          <Cuotas />
          <p className={styles.cuotaMensual}>Cuota mensual: {valorCuota}</p>

          <DescuentoContado
            precioVenta={selectedProduct.precio_venta}
            precioContado={selectedProduct.precio_contado}
          />

          <div className={styles.buttonContainer}>
            <WhatsAppButton nombre={selectedProduct.nombre} precio={selectedProduct.precio_venta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;