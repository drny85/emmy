import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import './index.css'
import ProductDetails from './pages/product/ProductDetails';
import ShoppingCartScreen from './pages/shopping/ShoppingCartScreen';

import Test from './pages/Test';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Signup from './pages/auth/Signup';
import AdminPage from './pages/admin/AdminPage';
import ProductList from './pages/admin/ProductList';
import NavBar from './components/nav/NavBar';
import AddProduct from './pages/admin/AddProduct';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#424242',
      main: '#212121',
      dark: '#002884',
      contrastText: '#f5f5f5',
    },
    secondary: {
      light: '#ff7961',
      main: '#01579b',
      dark: '#ba000d',
      contrastText: '#eceff1',
    },
  },
});

function App() {
  //BEM
  return (

    <ThemeProvider theme={theme}>
      <Router>
        {/* <Navbar /> */}
        {/* <Nav /> */}
        <div style={{height: '100vh'}}>
        <NavBar />
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/cart" component={ShoppingCartScreen} />
          <Route path="/admin/products" component={ProductList} />
          <Route path="/admin/product" component={AddProduct} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={AdminPage} />
          <Route exact path="/" component={Home} />
        </Switch>
        </div>
      </Router>
     
    </ThemeProvider>

  );
}

export default App;
