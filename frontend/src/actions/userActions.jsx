import axios from '../utils/axios'
import { SET_LOADING, USER_LOGIN, USER_LOGOUT, USER_SIGN_UP } from './types';
export const signup = ({name, lastName, email, password}) => async  dispatch => {
    
    try {
        const {data} = await axios.post('/api/users/signup', {name, lastName, email, password});
        
        console.log(data)
        dispatch({type: USER_SIGN_UP, payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const login = (email, password) => dispatch => {
    try {
        const {data} = axios.post('/api/users/login', {email, password});
        dispatch({type:USER_LOGIN, payload: data})
    } catch (error) {
        console.error(error)
    }
}

export const logout = () => dispatch => {

    dispatch({type: USER_LOGOUT})
}

const setLoading = () => dispatch => dispatch({type: SET_LOADING})
    
