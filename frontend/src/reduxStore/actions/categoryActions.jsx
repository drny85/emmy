import responseError from "../../utils/responseError"
import { ADD_CATEGORY, CATEGORY_ERROR, SET_LOADING } from "./types"
import axios from '../../utils/axios'

export const addCategory = name => async dispatch => {
    try {
        setLoading()
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOGUzZmM1YzkwM2Q1NDYxYzg3OWRjNSIsImlhdCI6MTYwMzIxODc1MCwiZXhwIjoxNjA1ODEwNzUwfQ.QTPnzG0YgSBcY4A37RLkKngoWg6kgmOX10ndODUbY-Q"
            }
        }
       const {data} = await axios.post('/api/admin/category', {name}, config)
        dispatch({type: ADD_CATEGORY, payload: data})
        return true
    } catch (error) {
        console.error(error)
        dispatch({type: CATEGORY_ERROR, payload: responseError(error)})
        return false
    }
}


const setLoading = () => dispath => dispath({ type: SET_LOADING })