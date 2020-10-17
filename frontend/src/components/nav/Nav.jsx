import { Badge, Hidden } from '@material-ui/core'
import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';

import './Nav.css'

const Nav = () => {
    const input = useRef()
    const { cartItems } = useSelector(state => state.cartData)

    const checkInput = () => {

        if (input.current.checked) {
            input.current.checked = false;
        }
    }
    return (
        <>

            <nav className='nav_header'>
                <input ref={input} type="checkbox" id="nav" className="hidden" />
                <label htmlFor="nav" className="nav-btn">
                    <i></i>
                    <i></i>
                    <i></i>
                </label>
                
                <div className="nav-wrapper">
                    <Hidden mdDown>
                    <div className="logo">
                    <Link to='/'>EmmyDash Artsy</Link>

                </div>
                    </Hidden>
               
                    <ul>
                        <li><Link onClick={checkInput} to="/">Home</Link></li>
                        <li><Link onClick={checkInput} to="/test">Overview</Link></li>
                        <li><Link onClick={checkInput} to="/admin">Admin</Link></li>
                        <li><Link onClick={checkInput} to="/signup">Login</Link></li>

                        <Hidden smDown>
                            <li><Link onClick={checkInput} to="/cart"> <Badge badgeContent={cartItems.length} color="secondary">
                                <ShoppingCartIcon />
                            </Badge></Link></li>
                        </Hidden>

                    </ul>
                </div>
            </nav>



            {/* <div style={{ marginBottom: '90px' }}></div> */}
        </>

    )
}

export default Nav
