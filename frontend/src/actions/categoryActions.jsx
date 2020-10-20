import responseError from "../utils/responseError"
import { ADD_CATEGORY, CATEGORY_ERROR, SET_LOADING } from "./types"
import axios from '../utils/axios'

export const addCategory = name => async dispatch => {
    try {
        setLoading()
       const {data} = await axios.post('/api/admin/category', {name})
        dispatch({type: ADD_CATEGORY, payload: data})
        
    } catch (error) {
        console.error(error)
        dispatch({type: CATEGORY_ERROR, payload: responseError(error)})
    }
}


const setLoading = () => dispath => dispath({ type: SET_LOADING })