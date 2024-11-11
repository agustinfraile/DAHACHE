import styles from './ManCollection.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const ManCollection = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state);

    const [visibleProducts, setVisibleProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const ITEMS_PER_LOAD = 10;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter(product => product.genero === "Hombre");
            setVisibleProducts(filteredProducts.slice(0, ITEMS_PER_LOAD));
        }
    }, [products]);

    const loadMoreProducts = () => {
        const newVisibleProducts = products
            .filter(product => product.genero === "Hombre")
            .slice(0, visibleProducts.length + ITEMS_PER_LOAD);

        setVisibleProducts(newVisibleProducts);
        setHasMore(newVisibleProducts.length < products.filter(product => product.genero === "Hombre").length);
    };

    return (
        <div className={styles.collectionContainer}>
            <h2 className={styles.collectionTitle}>Colección Hombre</h2>
            {loading && <p>Cargando productos...</p>}
            {error && <p>Error al cargar los productos</p>}
            <InfiniteScroll
                dataLength={visibleProducts.length}
                next={loadMoreProducts}
                hasMore={hasMore}
                loader={<p>Cargando más productos...</p>}
                className={styles.productGrid}
            >
                {visibleProducts.map((product) => (
                    <Link
                        to={`/product/${product.id_producto}`}
                        key={product.id_producto}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <ProductCard
                            key={product.id_producto}
                            imageUrl={product.fotos}
                            name={product.nombre}
                            price={product.precio_venta}
                        />
                    </Link>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default ManCollection;
