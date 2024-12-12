import styles from "./CategoryPage.module.css";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import CollectionHeader from "../../components/CollectionHeader/CollectionHeader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CategoryPage = ({ products }) => {
    const { genero, categoria } = useParams();

    const { loading, error } = useSelector((state) => state);

    const [categories, setCategories] = useState([]);

    const [visibleProducts, setVisibleProducts] = useState([]);

    const generoVerificado = genero[0].toUpperCase() + genero.slice(1, genero.length);

    const filteredProducts = products.filter(
        (product) =>
            product.genero.toLowerCase() === genero.toLowerCase() &&
            product.categoria.toLowerCase() === categoria.toLowerCase()
    );

    const capitalize = (text) => {
        if (!text) return '';
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter(product => product.genero === generoVerificado);
            setVisibleProducts(filteredProducts);

            const uniqueCategories = [...new Set(filteredProducts.map(product => product.categoria))];
            setCategories(uniqueCategories);
        }
    }, [products]);

    
    console.log(generoVerificado)

    return (
        <div className={styles.categoryPage}>
            <CollectionHeader text={`${capitalize(categoria)} ${capitalize(genero)}`} />

            {loading && <p>Cargando productos...</p>}
            {error && <p>Error al cargar los productos</p>}

            {/* Cajas de Categorías */}
            <div className={styles.categoryGrid}>
                {categories.map(category => (
                    <Link
                        to={`/categoria/${generoVerificado}/${category.toLowerCase()}`}
                        key={category}
                        className={styles.categoryBox}
                    >
                        <span className={styles.categoryName}>{category}</span>
                    </Link>
                ))}
            </div>


            <div className={styles.productGrid}>
                {filteredProducts.map((product) => (

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
                            promoPrice={product.precio_venta_promo}
                            category={product.categoria}
                        />
                    </Link>
                ))}
            </div>
            {filteredProducts.length === 0 && <p>No se encontraron productos en esta categoría.</p>}
        </div>
    );
};

export default CategoryPage;
