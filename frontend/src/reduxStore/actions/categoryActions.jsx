import responseError from "../../utils/responseError"
import { ADD_CATEGORY, CATEGORY_ERROR, GET_CATEGORIES, SET_LOADING } from "./types"
import axios from '../../utils/axios'

export const addCategory = name => async (dispatch, getState )=> {
    try {
        const {userData: {user}} = getState()
       
        setLoading()
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${user.token}`
            }
        }
       const {data} = await axios.post('/api/categories', {name}, config)
        dispatch({type: ADD_CATEGORY, payload: data})
        return true
    } catch (error) {
        console.error(error)
        dispatch({type: CATEGORY_ERROR, payload: responseError(error)})
        return false
    }
}

export const getCategories = () => async dispatch => {
    try {
        setLoading()
        const {data} = await axios.get('/api/categories')
        dispatch({type: GET_CATEGORIES, payload: data})
    } catch (error) {
        console.error(error)
        dispatch({type: CATEGORY_ERROR, payload: responseError(error)})
    }
   
}


const setLoading = () => dispath => dispath({ type: SET_LOADING })