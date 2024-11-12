import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import styles from './Home.module.css';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 3); // Limitar a productos destacados

  return (
    <section className={styles.home}>
      <section className={styles.heroSection}>
        <h1>Elegancia en cada prenda</h1>
        <p>Descubre la nueva colección de verano</p>
      </section>

      <section className={styles.featuredProducts}>
        <h2>Productos destacados</h2>
        <div className={styles.productGallery}>
          <ProductList products={featuredProducts} loading={loading} error={error} />
        </div>
      </section>
    </section>
  );
};

export default Home;
