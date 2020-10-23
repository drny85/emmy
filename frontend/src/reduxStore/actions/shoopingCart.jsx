import responseError from "../../utils/responseError"
import axios from '../../utils/axios'

const { ADD_TO_CART, CART_ERROR, REMOVE_FROM_CART, GET_CART } = require("./types")

const item = localStorage.getItem('emmyCart')
const cartId = JSON.parse(item)


const addToCart = (product) => async dispatch => {
    try {
        
        const {data} = await axios.post('/api/cart', {cartId, product})
       
        dispatch({ type: ADD_TO_CART, payload: product})

    } catch (error) {
        console.log('error')
        console.error(error.data)
    }
}

const removeFromCart = product => async dispatch => {
    try {
        console.log(product)
        dispatch({type: REMOVE_FROM_CART, payload: product})
        
    } catch (error) {
        console.error(error)
        console.log(product)
        dispatch({type: CART_ERROR, payload: responseError(error)})
    }
}

const createCart = () => async dispatch => {
    try {
       const {data} = await  axios.get('/api/cart')
       console.log(data)
       return data;
    } catch (error) {
        console.error(error)
    }
}


const getCartById = (id) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/cart/${id}`)
        dispatch({type: GET_CART, payload: data})
    } catch (error) {
        console.error(responseError(error))
    }
}


export { addToCart, removeFromCart, createCart, getCartById }