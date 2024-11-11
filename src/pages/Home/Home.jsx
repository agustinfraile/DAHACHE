// Home.js
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import styles from './Home.module.css';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  const dispatch = useDispatch();

  // Selecciona solo la porción `products` del estado
  const { products, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

    // Limita los productos a los tres primeros
    const featuredProducts = products.slice(0, 3);

  return (
    <section className={styles.home}>
      {/* Encabezado */}
      <section className={styles.heroSection}>
        <h1>Elegancia en cada prenda</h1>
        <p>Descubre la nueva colección de verano</p>
        <button className={styles.ctaButton}>Comprar ahora</button>
      </section>

      {/* Productos Destacados */}
      <section className={styles.featuredProducts}>
        <h2>Productos destacados</h2>
        <div className={styles.productGallery}>
          <ProductList products={featuredProducts} loading={loading} error={error} />
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletterSection}>
        <h2>Únete a nuestra newsletter</h2>
        <p>Recibe las últimas novedades y ofertas exclusivas</p>
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Tu email" />
          <button type="submit">Suscribirse</button>
        </form>
      </section>
    </section>
  );
};

export default Home;
