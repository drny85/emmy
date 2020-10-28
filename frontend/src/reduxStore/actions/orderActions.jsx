import axios from '../../utils/axios'
import responseError from '../../utils/responseError'
import { GET_ORDER_BY_ID, ORDER_ERROR, PLACE_ORDER, RESET_ORDER, SET_LOADING } from './types'

export const placeOrder = order => async dispatch => {
    try {
        
        setLoading()
        const {data} = await axios.post('/api/orders', order)
        dispatch({type: PLACE_ORDER, payload: data})

        return data._id
    } catch (error) {
        console.error(responseError(error))
    }
}

export const getOrders = () => async dispatch => {
    try {
        setLoading()
        const {data} = await axios.get('/api/orders')
    } catch (error) {
        console.error(responseError(error))
        dispatch({type: ORDER_ERROR, payload: responseError(error)})
    }
}

export const getOrderById = id => async dispatch => {
    try {
        setLoading()
        const {data} = await axios.get(`/api/orders/${id}`)
        dispatch({type: GET_ORDER_BY_ID, payload: data})
    } catch (error) {
        console.error(error)
        dispatch({type: ORDER_ERROR, payload: responseError(error)})
    }
}

export const resetOrder = () => dispatch => dispatch({type: RESET_ORDER})

const setLoading = () => dispatch => dispatch({type: SET_LOADING})