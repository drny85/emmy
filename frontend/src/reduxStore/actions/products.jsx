import { ADD_PRODUCT, GET_PRODUCTS, PRODUCT_ERROR, RESET_PRODUCT, SET_LOADING, SET_PRODUCT, UPDATE_PRODUCT } from "./types"

import axios from '../../utils/axios'
import responseError from "../../utils/responseError"


const getProducts = () => async dispatch => {
    try {
        
       dispatch({type: SET_LOADING})
       const {data} = await axios.get('/api/products')

        dispatch({ type: GET_PRODUCTS, payload: data })

    } catch (error) {
        console.log('Error getting products', error)
        dispatch({type: PRODUCT_ERROR, payload: responseError(error)})
    }
}

const addProduct = product => async (dispatch, getState) => {

    try {
        const {userData: {user}} = getState()
       
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${user.token}`
            }
        }
       dispatch({type: SET_LOADING})
      const {data} =   await axios.post('/api/products', product, config)

        dispatch({type: ADD_PRODUCT, payload: data})
        
    } catch (error) {
        console.log(error)
    }
}

const getProductById = (id) => async dispatch => {
    try {
        dispatch({type: SET_LOADING})
      
        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({type:SET_PRODUCT, payload: data})
    } catch (error) {
        console.log(error)
        dispatch({type: PRODUCT_ERROR, payload: responseError(error)})
    }

}

const updateProduct = (product) => async (dispatch, getState) => {
    try {
        const {userData: {user}} = getState()
       
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(`/api/products/${product._id}`, product, config)
        dispatch({type:UPDATE_PRODUCT, payload: data})
        return true
        
    } catch (error) {
        console.error(error)
        dispatch({type: PRODUCT_ERROR, payload: responseError(error)})
        return false

    }
}

const resetProduct = () => dispatch => {
    dispatch({type: RESET_PRODUCT})
}

const setLoading = () => dispath => dispath({ type: SET_LOADING })

export { getProducts, addProduct, getProductById , resetProduct, updateProduct}