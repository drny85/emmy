import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import './index.css'
import ProductDetails from './pages/product/ProductDetails';
import ShoppingCartScreen from './pages/shopping/ShoppingCartScreen';
import Nav from './components/nav/Nav';
import Test from './pages/Test';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Signup from './pages/auth/Signup';
import AdminPage from './pages/admin/AdminPage';

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
        <Nav />
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/cart" component={ShoppingCartScreen} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={AdminPage} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>

  );
}

export default App;
