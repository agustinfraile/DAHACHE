import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import PromotionSection from '../../components/PromotionSection/PromotionSection';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 3);

  return (
    <section className={styles.home}>
      <PromotionSection />

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
