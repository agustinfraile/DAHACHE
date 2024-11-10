// Home.js
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import styles from './Home.module.css';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();

  // Selecciona solo la porción `products` del estado
  const { products, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log('Home', products);

  return (
    <div className={styles.home}>
      {/* Encabezado */}
      <section className={styles.headerSection}>
        <h1>Bienvenido a Nuestro Catálogo</h1>
        <p>Encuentra los mejores productos seleccionados especialmente para ti.</p>
      </section>

      {/* Área destacada */}
      <section className={styles.featuredSection}>
        <h2>Producto Destacado</h2>
        <div className={styles.featuredContent}>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Producto Destacado"
            className={styles.featuredImage}
          />
          <div className={styles.featuredText}>
            <h3>Producto Especial</h3>
            <p>Descripción del producto especial con sus características y beneficios principales.</p>
          </div>
        </div>
      </section>

      {/* Galería de Productos */}
      <section className={styles.gallerySection}>
        <h2>Nuestros Productos</h2>
        <div className={styles.productGallery}>
          <ProductList 
            products={products} 
            loading={loading} 
            error={error}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
