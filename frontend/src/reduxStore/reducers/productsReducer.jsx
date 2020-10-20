import { ADD_PRODUCT, GET_PRODUCTS, RESET_PRODUCT, SET_LOADING, SET_PRODUCT } from "../actions/types";


const initialState = {
    products: [],
    product: null,
    error: false,
    loading: false
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload],
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false,
            }

        case RESET_PRODUCT:
            return {
                ...state,
                product: null,
                loading: false
            }

        case ADD_PRODUCT:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        default:
            return state;
    }
}


export default productsReducer;