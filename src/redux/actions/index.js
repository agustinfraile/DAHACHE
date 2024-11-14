// redux/actions.js
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_PRODUCT_BY_ID_FAILURE = 'GET_PRODUCT_BY_ID_FAILURE';

// Acción para obtener todos los productos
import listadoProductos from '../../config/listadoProductos.json'

export const getProducts = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: listadoProductos })
  }
}


// Acción para obtener un producto específico por su ID
export const getProductById = (id) => {
  return (dispatch) => {
    try {
      const product = listadoProductos.find((product) => product.id_producto === id);
      if (product) {
        dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: product });
      } else {
        dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: 'Producto no encontrado' });
      }
    } catch (error) {
      dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
  };
};