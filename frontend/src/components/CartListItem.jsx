import { Avatar, Divider } from '@material-ui/core'
import React from 'react'


import { makeStyles } from '@material-ui/core/styles';


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


const CartListItem = ({ product }) => {

    const { qty, price, name } = product
    console.log(product)
    const classes = useStyles()
    return (
        <div className='cart_list_items'>
            <div className="cart_list_item">
                <div className="cart_list_img">
                    <Avatar src={product.imageUrl} className={classes.large} />
                    <h6>{name}</h6>
                    <p>{qty} x {price}</p>


                </div>
            </div>
            <div className="cart_list_item"></div>
            <Divider light />
        </div>
    )
}

export default CartListItem
