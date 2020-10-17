import { ADD_TO_CART } from "../actions/types";

const initialState = {
    cartItems: [],
    loading: false,
    total: 0,
    quantity: 0
}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const product = action.payload


            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems, action.payload],
                quantity: state.quantity + product.qty,
                total: state.total + +product.price
            }

        default:
            return state;
    }

}