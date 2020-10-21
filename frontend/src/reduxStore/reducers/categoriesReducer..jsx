import { ADD_CATEGORY, CATEGORY_ERROR, GET_CATEGORIES } from "../actions/types"


const initialState = {
    categories: [],
    category: null,
    error: null,
    loading: false
}

const categoriesReducer = (state= initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            
            return {
                ...state,
                categories: [action.payload, ...state.categories],
                loading: false,
                error: null,
            }

        case CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                error: null,
                loading: false,
                categories: action.payload
            }
    
        default:
            return state
    }
}

export default categoriesReducer