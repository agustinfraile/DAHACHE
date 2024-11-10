import styles from "./Products.module.css";

import ProductList from "../../components/ProductList/ProductList";



const Products = () => {
    return (
        <section className={styles.sectionHome}>
            <ProductList />
        </section>
    )
}

export default Products