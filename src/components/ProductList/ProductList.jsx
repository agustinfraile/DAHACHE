import styles from "./ProductList.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";





const ProductList = ({ products, loading, error }) => {
    // Accede al estado de productos desde Redux

    // Mostrar mensaje de carga
    if (loading) return <p>Cargando productos...</p>;

    // Mostrar mensaje de error
    if (error) return <p>Error al cargar productos: {error}</p>;

    return (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {products.map((product) => (
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
                </div>
            );
};

            export default ProductList;
