import axios from '../../utils/axios';
import responseError from '../../utils/responseError';
import {
  SET_LOADING,
  USER_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGN_UP,
} from './types';
export const signup = ({ name, lastName, email, password }) => async (
  dispatch
) => {
  try {
    setLoading();
    const { data } = await axios.post('/api/users/signup', {
      name,
      lastName,
      email,
      password,
    });
    dispatch({ type: USER_SIGN_UP, payload: data });
    localStorage.setItem('emmyUserData', JSON.stringify(data));
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_ERROR, payload: responseError(error) });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.post('/api/users/login', { email, password });

    dispatch({ type: USER_LOGIN, payload: data });
    localStorage.setItem('emmyUserData', JSON.stringify(data));
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_ERROR, payload: responseError(error) });
  }
};

export const autoLoginUser = (user) => async (dispatch, getState) => {
  try {
    setLoading();

    const { data } = await axios.get('/api/users/' + user._id);

    dispatch({ type: USER_LOGIN, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_ERROR, payload: responseError(error) });
  }
};

export const logout = () => (dispatch) => {
  setLoading();
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem('emmyUserData');
};

const setLoading = () => (dispatch) => dispatch({ type: SET_LOADING });
