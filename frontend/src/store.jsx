import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import productsReducer from './reducers/productsReducer'
import cartReducer from './reducers/shoppingCartReducer'



const reducer = combineReducers({
    productsData: productsReducer,
    cartData: cartReducer
})


const store = createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


export default store;