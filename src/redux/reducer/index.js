import { GET_PRODUCTS } from "../actions";




// Estado inicial del reducer
const initialState = {
    products: [],
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
        default:
            return state;
    }
};


export default productsReducer; // Exporta productsReducer como default