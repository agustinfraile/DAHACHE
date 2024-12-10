import styles from './WomenCollection.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import CollectionHeader from '../../components/CollectionHeader/CollectionHeader';

const ManCollection = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state);

    const [categories, setCategories] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter(product => product.genero === "Mujer");
            setVisibleProducts(filteredProducts);

            const uniqueCategories = [...new Set(filteredProducts.map(product => product.categoria))];
            setCategories(uniqueCategories);
        }
    }, [products]);

    return (
        <div className={styles.collectionContainer}>
            <CollectionHeader text="Colección Mujer" />

            {loading && <p>Cargando productos...</p>}
            {error && <p>Error al cargar los productos</p>}

            {/* Cajas de Categorías */}
            <div className={styles.categoryGrid}>
                {categories.map(category => (
                    <Link
                        to={`/categoria/mujer/${category.toLowerCase()}`}
                        key={category}
                        className={styles.categoryBox}
                    >
                        <span className={styles.categoryName}>{category}</span>
                    </Link>
                ))}
            </div>

            {/* Listado de Productos */}
            <div className={styles.productGrid}>
                {visibleProducts.map(product => (
                    <Link
                        to={`/product/${product.id_producto}`}
                        key={product.id_producto}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <ProductCard
                            imageUrl={product.fotos}
                            name={product.nombre}
                            price={product.precio_venta}
                            promoPrice={product.precio_venta_promo}
                            category={product.categoria}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ManCollection;
