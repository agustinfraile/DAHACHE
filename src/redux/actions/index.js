// redux/actions.js
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';

// Acción para obtener todos los productos
import listadoProductos from '../../config/listadoProductos.json'

export const getProducts = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: listadoProductos })
  }
}
