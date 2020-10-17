import { ADD_PRODUCT, GET_PRODUCTS, RESET_PRODUCT, SET_LOADING, SET_PRODUCT } from "./types"
import products from '../data/products'
import { AccordionActions } from "@material-ui/core"

import axios from '../utils/axios'


const getProducts = () => async dispatch => {
    try {
        setLoading()
    
       const {data} = await axios.get('/api/products')
       console.log(data)

        dispatch({ type: GET_PRODUCTS, payload: data })

    } catch (error) {
        console.log('Error getting products', error)
    }
}

const addProduct = product => async dispatch => {
    try {
    setLoading()
      const {data} =   await axios.post('/api/products', product)

        dispatch({type: ADD_PRODUCT, payload: data})
        
    } catch (error) {
        console.log(error)
    }
}

const getProductById = (id) => async dispatch => {
    try {
        setLoading()
        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({type:SET_PRODUCT, payload: data})
    } catch (error) {
        console.log(error)
    }

}

const resetProduct = () => dispatch => {
    dispatch({type: RESET_PRODUCT})
}

const setLoading = () => dispath => dispath({ type: SET_LOADING })

export { getProducts, addProduct, getProductById , resetProduct}