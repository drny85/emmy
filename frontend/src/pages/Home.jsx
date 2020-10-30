import React, { useEffect } from 'react';
import { Button, Divider, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../reduxStore/actions/products';
import { getCategories } from '../reduxStore/actions/categoryActions';
import ProductCard from '../components/cards/ProductCard';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import EmptyPage from '../components/EmptyPage';
import Loader from '../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    minHeight: '100vh',
    marginTop: '5px',
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.productsData);
  const { user } = useSelector((state) => state.userData);
  const { categories } = useSelector((state) => state.categoriesData);

  const goToDetails = (id) => {
    history.push(`/product/${id}`);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (products.length === 0) {
    return (
      <EmptyPage>
        <h4 style={{ marginBottom: '20px' }}>
          This page is under contruction or does not have any products listed
        </h4>
        {user && user.isAdmin && (
          <Button
            variant='contained'
            component={Link}
            to='/admin/product'
            color='primary'
          >
            Add my first product
          </Button>
        )}
      </EmptyPage>
    );
  }

  return (
    // <Container className={classes.root} spacing={1}>
    // <Grid container item xs={12} spacing={4}>
    //   {products.map((product) => {
    //     return (
    //       <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
    //         <ProductCard
    //           id={product._id}
    //           product={product}
    //           onClick={() => goToDetails(product._id)}
    //         />
    //       </Grid>
    //     );
    //   })}
    // </Grid>

    // </Container>
    <div
      className='home'
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyItems: 'center',
        margin: 'auto',
        maxWidth: '1700px',
      }}
    >
      <Grid container alignContent='center'>
        <Grid item>
          {categories.map((category) => {
            return (
              <div id={category._id} key={category._id} className='items '>
                {products.filter((p) => p.category._id === category._id)
                  .length > 0 && (
                  <h2 style={{ padding: '10px' }} className='capitalize'>
                    {category.name}
                  </h2>
                )}

                <Grid item container>
                  {products
                    .filter((product) => product.category._id === category._id)
                    .map((item) => (
                      <Grid key={item._id} item>
                        <ProductCard
                          product={item}
                          onClick={() => goToDetails(item._id)}
                        />
                      </Grid>
                    ))}
                </Grid>
                <Divider variant='middle' />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
