import React, { useEffect } from 'react'
import { Container, Grid, Ale } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import Product from '../components/Product';

import axios from '../utils/axios'
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
        // <div className="home_container">
        //     {products.length > 0 ? (<div className="home_grid">
        //         {products.map(product => (<ProductCard key={product._id} id={product._id} product={product} onClick={() => goToDetails(product._id)} />))}
        //     </div>):(
        //       <div className="">
        //           <h4>No products available</h4>
        //       </div>
        //     )}
            






        // </div>
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
