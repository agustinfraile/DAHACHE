import styles from './ProductCard.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Cuotas from '../Cuotas/Cuotas';

const ProductCard = ({ imageUrl = [], name, price, category }) => {
  // Formatear precio sin decimales
  const formattedPrice = Math.floor(price).toLocaleString('es-AR');

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
                src={foto}
                alt={`${name} - Foto ${index + 1}`}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{`${category} ${name}`}</h2>
        {/* Precio formateado sin decimales */}
        <p className={styles.price}>${formattedPrice}</p>
        {/* Cuotas sin interés */}
        <Cuotas />
      </div>
    </div>
  );
};

export default ProductCard;
