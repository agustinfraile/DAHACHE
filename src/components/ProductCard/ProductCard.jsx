// ProductCard.jsx
import styles from './ProductCard.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const ProductCard = ({ imageUrl = [], name, price }) => {
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    // Formato para el precio
    const formatPrice = (price) => price.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
    });

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
                    style={{
                        '--swiper-navigation-color': '#c3c3c3',
                    }}
                >
                    {imageUrl.map((foto, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={foto}
                                alt={`${name} - Foto ${index + 1}`}
                                className={styles.image}
                                draggable="false"
                                onContextMenu={handleContextMenu}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.info}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.price}>{formatPrice(price)}</p>
                <button className={styles.addToCartButton}>Añadir al carrito</button>
            </div>
        </div>
    );
};

export default ProductCard;
