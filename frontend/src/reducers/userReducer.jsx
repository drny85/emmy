import { SET_LOADING, USER_LOGIN, USER_LOGOUT, USER_SIGN_UP } from "../actions/types"

const initialState = {
    user: null,
    users: [],
    loading: false,
    error:null
}

const storageRef = 'emmyUserData'


const userReducer = (state= initialState, action) => {
    switch(action.type) {
        case USER_SIGN_UP:
        case USER_LOGIN:
            localStorage.setItem(storageRef, JSON.stringify(action.payload))
            return {
                ...state,
                user: action.payload,
                error: null
            };

        case SET_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        
        case USER_LOGOUT:
            localStorage.removeItem(storageRef)
            return {
                ...state,
                user: null,
                error: null,
                users: []
            }

        default:
            return state;
    }
}

export default userReducer