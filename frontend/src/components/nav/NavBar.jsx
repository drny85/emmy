import { Hidden, Badge } from '@material-ui/core';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import './NavBar.css';

const useStyles = makeStyles((theme) => ({}));

const HamNav = () => {
  const input = useRef();
  const classes = useStyles();

  const { quantity } = useSelector((state) => state.cartData);
  const { loading, user } = useSelector((state) => state.userData);

  const checkInput = () => {
    if (input.current.checked) {
      input.current.checked = false;
    }
  };

  return (
    <header className={classes.root}>
      <div className='menu-wrap'>
        <input ref={input} type='checkbox' className='toggler' />

        <div className='hamburger'>
          <div></div>
        </div>

        <div className='menu'>
          <div>
            <div>
              <ul>
                <li>
                  <Link onClick={checkInput} to='/'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link onClick={checkInput} to='/admin'>
                    Admin
                  </Link>
                </li>
                <li>
                  <Link onClick={checkInput} to='/signup'>
                    {user && !loading && user.name ? user.name : 'Login'}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='links'>
          <Hidden mdUp>
            <ul>
              <li style={{ marginRight: 'auto', marginLeft: '70px' }}>
                <Link
                  style={{ fontSize: '1.1rem' }}
                  onClick={checkInput}
                  to='/'
                >
                  Emmy-Dash
                </Link>
              </li>
              <li>
                <Link onClick={checkInput} to='/cart'>
                  {' '}
                  <Badge badgeContent={quantity} color='secondary'>
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </li>
            </ul>
          </Hidden>
          <Hidden smDown>
            <ul>
              <li style={{ marginRight: 'auto', marginLeft: '70px' }}>
                <Link onClick={checkInput} to='/'>
                  Emmy-Dash
                </Link>
              </li>
              <li>
                <Link onClick={checkInput} to='/'>
                  Home
                </Link>
              </li>
              {user && user.isAdmin && (
                <li>
                  <Link onClick={checkInput} to='/admin'>
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <Link
                  className='capitalize bold'
                  onClick={checkInput}
                  to={user && !loading ? '/profile' : '/login'}
                >
                  {user && !loading ? user?.name : 'Login'}
                </Link>
              </li>

              <Hidden smDown>
                <li>
                  <Link onClick={checkInput} to='/cart'>
                    {' '}
                    <Badge badgeContent={quantity} color='secondary'>
                      <ShoppingCartIcon />
                    </Badge>
                  </Link>
                </li>
              </Hidden>
            </ul>
          </Hidden>
        </div>
      </div>
    </header>
  );
};

export default HamNav;
