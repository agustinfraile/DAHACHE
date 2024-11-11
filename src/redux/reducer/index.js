import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from "../actions";

// Estado inicial del reducer
const initialState = {
    products: [], // Lista de productos
    selectedProduct: null, // Producto específico seleccionado
    loading: false,
    error: null,
};

// Reducer de productos
const productsReducer = (state = initialState, action) => {
    console.log("Reducer action received:", action); // Verificación
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                loading: false,
                selectedProduct: action.payload, // Guarda el producto específico
            };
        default:
            return state;
    }
};

export default productsReducer;
