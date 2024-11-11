// ManCollection.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions';
import styles from './ManCollection.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';

const ManCollection = () => {
    const dispatch = useDispatch();

    // Obtenemos los productos del estado global
    const { products, loading, error } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Filtramos los productos para obtener solo los de la categoría "Hombre"
    const manProducts = products.filter(product => product.genero === "Hombre");

    return (
        <div className={styles.collectionContainer}>
            <h2 className={styles.collectionTitle}>Colección Hombre</h2>
            {loading && <p>Cargando productos...</p>}
            {error && <p>Error al cargar los productos</p>}
            <div className={styles.productGrid}>
                {manProducts.map((product) => (
                    <ProductCard
                        key={product.id_producto}
                        imageUrl={product.fotos}
                        name={product.nombre}
                        price={product.precio_venta}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManCollection;
