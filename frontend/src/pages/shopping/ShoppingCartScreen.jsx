import { Avatar, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CartListItem from '../../components/CartListItem'

const ShoppingCartScreen = () => {

    const { cartItems } = useSelector(state => state.cartData)
    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant='h5'>Shopping Cart</Typography>
            <Paper style={{ padding: '1rem', marginTop: '1rem' }}>
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
            </Paper>
        </Container>
    )
}

export default ShoppingCartScreen
