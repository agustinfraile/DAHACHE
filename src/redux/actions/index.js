import axios from "axios";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'; 

// Acción para obtener todos los productos
export const getProducts = () => async (dispatch) => {
    try {
        console.log("Fetching products...");
        const response = await axios.get(`http://localhost:3001/products`);
        console.log("Products fetched:", response.data);
        dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

// Acción para obtener un producto específico por su ID
export const getProductById = (id) => async (dispatch) => {
    try {
        console.log(`Fetching product with id ${id}...`);
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        console.log("Product fetched:", response.data);
        dispatch({ type: GET_PRODUCT_BY_ID, payload: response.data });
    } catch (error) {
        console.error(`Error al obtener el producto con id ${id}:`, error);
    }
};
