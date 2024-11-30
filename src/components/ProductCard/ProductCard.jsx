import styles from './ProductCard.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Cuotas from '../Cuotas/Cuotas';
import DescuentoEspecialProducto from '../DescuentoEspecialProducto/DescuentoEspecialProducto';

const ProductCard = ({ imageUrl = [], name, price, promoPrice, category }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Swiper
          modules={[Navigation]}
          navigation
          loop={true}
          slidesPerView={1}
          spaceBetween={10}
          className={styles.swiper}
        >
          {imageUrl.map((foto, index) => (
            <SwiperSlide key={index}>
              <img
                src={foto}F
                alt={`${name} - Foto ${index + 1}`}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{`${category} ${name}`}</h2>
        {/* Mostrar el precio tachado y el nuevo precio promocional */}
        <DescuentoEspecialProducto precioAnterior={price} precioActual={promoPrice} />
        {/* Sección de cuotas */}
        <Cuotas />
      </div>
    </div>
  );
};

export default ProductCard;
