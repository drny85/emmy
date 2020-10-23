import { Button, Container, Grid, List, ListItem, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartListItem from '../../components/CartListItem'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    btn: {
        backgroundColor: theme.palette.error
    }
}))

const ShoppingCartScreen = () => {
    const classes = useStyles()

    const { cartItems } = useSelector(state => state.cartData)
    return (
        <div style={{ margin: 'auto 20px'}} >
            <div>
                <Grid container>
                    <Grid item xs={8}>  <Typography variant='h5'>Shopping Cart</Typography></Grid>
                    <Grid item xs={4}>
                    <Button variant='outlined' color='primary' component={Link} className={classes.btn} to='/'>Clear Cart</Button>
                    </Grid>
                </Grid>
          
            {cartItems.length === 0 ? (
                <div className="center" style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                    <h3 style={{margin: '1rem'}}>Your cart is empty</h3>
                    <Button variant='outlined' color='primary' component={Link} to='/'>Go Shopping</Button>
                </div>  
                
            ) : ( <Paper style={{ padding: '1rem', marginTop: '1rem' }}>
            <Grid container>

                <Grid item xs={12} sm={8}>
                    <List>
                        {cartItems.map(item => {
                            const product = { ...item.product, qty: item.qty }
                            return <ListItem key={item.id}>
                                <CartListItem product={product} />

                            </ListItem>

                        })}
                    </List>
                </Grid>
                <Grid item xs={12} sm={4}></Grid>
            </Grid>
        </Paper>)}
            </div>
        </div>
    )
}

export default ShoppingCartScreen
