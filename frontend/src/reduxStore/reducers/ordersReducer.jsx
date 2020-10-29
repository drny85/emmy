import {
  GET_ORDERS,
  GET_ORDER_BY_ID,
  ORDER_ERROR,
  PLACE_ORDER,
  RESET_ORDER,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  filtered: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case RESET_ORDER:
      return {
        ...state,
        order: null,
        loading: false,
        error: null,
      };
    case GET_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default ordersReducer;
