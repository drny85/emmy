import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import categoriesReducer from './reducers/categoriesReducer.'
import productsReducer from './reducers/productsReducer'
import cartReducer from './reducers/shoppingCartReducer'
import userReducer from './reducers/userReducer'



const reducer = combineReducers({
    productsData: productsReducer,
    cartData: cartReducer,
    userData: userReducer,
    categoriesData: categoriesReducer
})


const store = createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


export default store;