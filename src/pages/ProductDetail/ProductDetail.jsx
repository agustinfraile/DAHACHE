import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductById } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

const ProductDetail = () => {
  const { productId } = useParams(); 
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.selectedProduct);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  console.log('Producto seleccionado:', selectedProduct);

  return (
    <div>
      {selectedProduct ? (
        <div>
          <h1>{selectedProduct.nombre}</h1>
          <p>{selectedProduct.descripcion}</p>
          <p>Precio: {selectedProduct.precio_venta}</p>

          {/* Carrusel de imágenes */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            loop={true}              
            pagination={{ clickable: true }}
          >
            {selectedProduct.fotos && selectedProduct.fotos.map((foto, index) => (
              <SwiperSlide key={index}>
                <img src={foto} alt={`Foto ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ProductDetail;
