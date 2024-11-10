import axios from "axios";

export const GET_PRODUCTS = 'GET_PRODUCTS';


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
