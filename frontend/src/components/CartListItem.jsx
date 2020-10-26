import { Avatar, Button, ButtonGroup, Divider, IconButton } from '@material-ui/core'
import React from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../reduxStore/actions/shoopingCart';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import CartItem from '../models/CartItem';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));


const CartListItem = ({ product}) => {
    const dispatch = useDispatch()
    const { qty, price, name } = product
    const classes = useStyles()

    const handleDelete = () => {
        dispatch(removeFromCart(product))
    }

    const handleAddToCart = () => {
        
    const item = new CartItem(product, 1, product.price)
       dispatch(addToCart(item))
    }

    return (
        <div className='cart_list_items'>
            <div className="cart_list_item">
                <div className="cart_list_img">
                    <Avatar src={product.imageUrl} className={classes.large} />
                    <h6>{name}</h6>
                    <p>{qty} x {price}</p>


                </div>
            </div>
            <div className="add_remove">
            <ButtonGroup color="primary" aria-label="outlined primary button group">
  <Button onClick={handleDelete}><RemoveRoundedIcon /></Button>
    <Button>{qty}</Button>
  <Button onClick={handleAddToCart}><AddRoundedIcon /></Button>
</ButtonGroup>
            </div>
            <div className="cart_list_item">
                <IconButton onClick={handleDelete}>
                    <DeleteOutlineIcon color='primary' />
                </IconButton>
            </div>
            <Divider light />
        </div>
    )
}

export default CartListItem
