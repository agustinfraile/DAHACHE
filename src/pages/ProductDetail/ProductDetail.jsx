import styles from './ProductDetail.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-medium-image-zoom/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Cuotas from '../../components/Cuotas/Cuotas';
import DescuentoContado from '../../components/DescuentoContado/DescuentoContado';
import DescuentoEspecialProducto from '../../components/DescuentoEspecialProducto/DescuentoEspecialProducto';
import Zoom from 'react-medium-image-zoom';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import { useEffect } from 'react';
import { getProductById } from '../../redux/actions';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);

  useEffect(() => {
    if (!productDetail || productDetail.id_producto !== productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId, productDetail]);

  if (!productDetail) {
    return <p>Producto no encontrado.</p>;
  }

  const cuotasSinInteres = productDetail.cuotas_sin_interes || 3;
  const valorCuota = (productDetail.precio_venta_promo / cuotasSinInteres).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  const precioVenta = productDetail.precio_venta;
  const precioVentaPromo = productDetail.precio_venta_promo;
  const porcentajeDescuentoTransferencia = 0.8;
  const descuentoTransferencia = precioVentaPromo * porcentajeDescuentoTransferencia; 
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
            {productDetail.fotos.map((foto, index) => (
              <SwiperSlide key={index}>
                <Zoom>
                  <img
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className={styles.productImage}
                  />
                </Zoom>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{`${productDetail.categoria} ${productDetail.nombre}`}</h1>
          <DescuentoEspecialProducto precioAnterior={precioVenta} precioActual={precioVentaPromo} />
          <p className={styles.productDescription}>{productDetail.descripcion}</p>

          <Cuotas />
          <p className={styles.cuotaMensual}>{cuotasSinInteres} cuotas sin interés de: {valorCuota} </p>

          <DescuentoContado
            precioVenta={precioVenta}
          />

          <div className={styles.buttonContainer}>
            <WhatsAppButton nombre={productDetail.nombre} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
