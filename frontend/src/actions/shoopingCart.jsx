const { ADD_TO_CART } = require("./types")


const addToCart = (product) => async dispatch => {
    try {

        dispatch({ type: ADD_TO_CART, payload: product })

    } catch (error) {
        console.log('error')
    }
}


export { addToCart }