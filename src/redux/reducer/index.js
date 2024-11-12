// reducer.js
const initialState = {
    products: [],
    loading: false,
    error: null,
};

function productReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'GET_PRODUCTS_FAILURE':
            return { ...state, error: action.payload, loading: false };
        case 'GET_PRODUCTS_REQUEST':
            return { ...state, loading: true };
        default:
            return state;
    }
}

export default productReducer;
