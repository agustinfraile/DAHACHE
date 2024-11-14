const initialState = {
    products: [],
    productDetail: null,
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
        case 'GET_PRODUCT_BY_ID_SUCCESS':
            return { ...state, productDetail: action.payload, loading: false };
        case 'GET_PRODUCT_BY_ID_FAILURE':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export default productReducer;
    