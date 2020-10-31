import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';
import ProductDetails from './pages/product/ProductDetails';
import ShoppingCartScreen from './pages/shopping/ShoppingCartScreen';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Signup from './pages/auth/Signup';
import AdminPage from './pages/admin/AdminPage';
import ProductList from './pages/admin/ProductList';
import NavBar from './components/nav/NavBar';
import AddProduct from './pages/admin/AddProduct';
import { useDispatch } from 'react-redux';
import { autoLoginUser } from './reduxStore/actions/userActions';
import ProfilePage from './pages/auth/ProfilePage';
import Login from './pages/auth/Login';
import ProductEdit from './pages/admin/ProductEdit';
import CategoryPage from './pages/categories/CategoryPage';
import { createCart, getCartById } from './reduxStore/actions/shoppingCart';

import ShippingPage from './pages/shopping/ShippingPage';
import OrderSummary from './pages/shopping/OrderSummary';
import MyOrders from './pages/shopping/MyOrders';
import OrderDetails from './pages/orders/OrderDetails';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import CouponsPage from './pages/admin/CouponsPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#01579b',
      dark: '#002f6c',
      contrastText: '#f5f5f5',
    },
    secondary: {
      light: '#718792',
      main: '#455a64',
      dark: '#1c313a',
      contrastText: '#eceff1',
    },
  },
});

function generateCart(key, value) {
  const found = localStorage.getItem(key);
  if (found) {
    return localStorage.getItem(JSON.parse(found));
  }

  localStorage.setItem(key, JSON.stringify(value));
}

const saveCartId = async (dispatch) => {
  if (!localStorage.getItem('emmyCart')) {
    const data = await dispatch(createCart());
    generateCart('emmyCart', data);
  }
};

function App() {
  const dispatch = useDispatch();
  saveCartId(dispatch);

  useEffect(() => {
    const user = localStorage.getItem('emmyUserData');
    dispatch(getCartById());

    if (user && user !== undefined) {
      const data = JSON.parse(user);

      dispatch(autoLoginUser(data));
    }
  }, [dispatch]);
  //BEM
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ height: '100vh' }}>
          <NavBar />
          <Switch>
            <Route path='/cart' component={ShoppingCartScreen} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/shipping' component={ShippingPage} />
            <Route path='/orders/:id' component={OrderDetails} />
            <Route path='/orders' component={MyOrders} />
            <Route path='/order-summary' component={OrderSummary} />
            <Route path='/admin/coupons' component={CouponsPage} />
            <Route path='/admin/category' component={CategoryPage} />
            <Route path='/admin/orders' component={AdminOrdersPage} />
            <Route path='/admin/products' component={ProductList} />
            <Route path='/admin/product/edit/:id' component={ProductEdit} />
            <Route path='/admin/product' component={AddProduct} />
            <Route path='/product/:id' component={ProductDetails} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={AdminPage} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
