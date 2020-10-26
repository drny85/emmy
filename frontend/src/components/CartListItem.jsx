import { Avatar, Button, ButtonGroup, Divider, Grid, Hidden, IconButton } from '@material-ui/core'
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
        
        <Grid container justify='space-around' alignItems='center' className='cart_list_item'>
            <Hidden xsDown>
                <Hidden smDown>
                <Grid item xs={4} md={3}>
                <Avatar src={product.imageUrl} className={classes.large} />
                </Grid>
                </Hidden>
            
                <Grid item xs={4} md={3}>
                <h6 className='capitalize'>{name}</h6>
                <p>{qty} x {price}</p>
                </Grid>
                <Grid item xs={4} md={3}>
                    <ButtonGroup color="primary" size='small' aria-label="outlined primary button group">
                    <Button onClick={handleDelete}><RemoveRoundedIcon /></Button>
                        <Button>{qty}</Button>
                    <Button onClick={handleAddToCart}><AddRoundedIcon /></Button>
                </ButtonGroup>
                </Grid>
                <Grid item xs={4} md={3}>
                <p className='bold'>${parseFloat(price * qty).toFixed(2)}</p>
                </Grid>
                

         </Hidden>
            

             <Hidden smUp>
                 <Grid item xs={5}>
                 <Avatar src={product.imageUrl} className={classes.large} />
                 </Grid>
                 <Grid item container xs={7} justify='center' alignItems='center' >
                     <Grid item>
                     <p style={{textAlign: 'center', margin: '8px'}} className='bold'>${parseFloat(price * qty).toFixed(2)}</p>
                     <ButtonGroup color="primary" size='small' aria-label="outlined primary button group">
                        <Button onClick={handleDelete}><RemoveRoundedIcon /></Button>
                            <Button>{qty}</Button>
                        <Button onClick={handleAddToCart}><AddRoundedIcon /></Button>
                    </ButtonGroup>
                     </Grid>

                 </Grid>

            </Hidden>
           
            <Divider light />
        </Grid>
    
        // <div className='cart_list_items'>
        //     <div className="cart_list_item">
        //         <div className="cart_list_img">
        //             <Avatar src={product.imageUrl} className={classes.large} />
        //             <h6>{name}</h6>
        //             <p>{qty} x {price}</p>


        //         </div>
        //     </div>
        //     <div className="add_remove">
        //     <ButtonGroup color="primary" aria-label="outlined primary button group">
        //         <Button onClick={handleDelete}><RemoveRoundedIcon /></Button>
        //             <Button>{qty}</Button>
        //         <Button onClick={handleAddToCart}><AddRoundedIcon /></Button>
        //     </ButtonGroup>
        //     </div>
        //     <div className="cart_list_item">
        //         <p>${price * qty}</p>
        //     </div>
        //     <Divider light />
        // </div>
    )
}

export default CartListItem
