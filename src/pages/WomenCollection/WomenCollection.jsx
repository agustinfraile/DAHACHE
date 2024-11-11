
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions';
import { useEffect } from 'react';
import styles from "./WomenCollection.module.css"
import ProductCard from '../../components/ProductCard/ProductCard';


const WomenCollection = () => {
    const dispatch = useDispatch();

    // Obtenemos los productos del estado global
    const { products, loading, error } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Filtramos los productos para obtener solo los de la categoría "Mujer"
    const manProducts = products.filter(product => product.genero === "Mujer");

    return (
        <section className={styles.collectionContainer}>
            <h2 className={styles.collectionTitle}>Colección Mujer</h2>
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
        </section>
    );
}

export default WomenCollection