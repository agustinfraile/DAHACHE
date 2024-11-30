import styles from "./ProductList.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

const ProductList = ({ products, loading, error }) => {
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos: {error}</p>;

    if (!products || products.length === 0) return <p>No hay productos para mostrar.</p>;

    

    return (
        <div className={styles.productGrid}>
            {products.map((product) => (
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
    );
};

export default ProductList;
