import styles from "./CategoryPage.module.css";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import CollectionHeader from "../../components/CollectionHeader/CollectionHeader";

const CategoryPage = ({ products }) => {
    const { genero, categoria } = useParams();

    // Filtrar los productos por género y categoría
    const filteredProducts = products.filter(
        (product) =>
            product.genero.toLowerCase() === genero.toLowerCase() &&
            product.categoria.toLowerCase() === categoria.toLowerCase()
    );

    const capitalize = (text) => {
        if (!text) return ''; // Maneja casos donde la variable sea undefined o null
        return text
            .toLowerCase() // Convierte todo el texto a minúsculas primero
            .split(' ') // Divide las palabras por espacio (en caso de varias palabras)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
            .join(' '); // Une las palabras nuevamente
    };


    return (
        <div className={styles.categoryPage}>
            <CollectionHeader text={`${capitalize(categoria)} ${capitalize(genero)}`} />


            <div className={styles.productGrid}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id_producto}
                        imageUrl={product.fotos}
                        name={product.nombre}
                        price={product.precio_venta}
                        promoPrice={product.precio_venta_promo}
                        category={product.categoria}
                    />
                ))}
            </div>
            {filteredProducts.length === 0 && <p>No se encontraron productos en esta categoría.</p>}
        </div>
    );
};

export default CategoryPage;
