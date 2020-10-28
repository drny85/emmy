import React, { useEffect } from 'react'
import { Grid,  } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../reduxStore/actions/products';
import ProductCard from '../components/cards/ProductCard';
import { useHistory } from 'react-router-dom';
import './Home.css'
import Message from '../components/Message';


const useStyles = makeStyles((theme) => ({
    root: {

        flex: 1,
        minHeight: '100vh',
        marginTop: '5px'


    },


}));

const Home = () => {

    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()

    const { products, loading } = useSelector(state => state.productsData)

    

    const goToDetails = (id) => {
        history.push(`/product/${id}`)
    }

    useEffect(() => {
        
        dispatch(getProducts())

    }, [dispatch])

    return (
     
        // <Container className={classes.root} spacing={1}>
            <Grid container item xs={12} spacing={4}>

                {products.map(product => {
                    return <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard id={product._id} product={product} onClick={() => goToDetails(product._id)} />
                    </Grid>
                })
                }


            </Grid>

        // </Container>
    )
}

export default Home
