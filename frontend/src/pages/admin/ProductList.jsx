import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Container, Grid, Tab, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {getProducts} from '../../reduxStore/actions/products'
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
      fontWeight: 'bold',
      
    },


  });

const ProductList = ({history}) => {
    const classes = useStyles();
    const {products, loading} = useSelector(state => state.productsData)
    
    const dispatch = useDispatch()

    const handleDelete = id => {
        console.log(id)
    }
    useEffect(() => {

        dispatch(getProducts())
       
        
    }, [dispatch])

    if (loading) return <Loader />
    return (
       <Container>
            <Grid container alignContent='center'>
                <Grid item xs={8}>
                <Typography align='center' variant='h4'>Products List</Typography>
                </Grid>
                <Grid item sx={4}>
                <Button variant="outlined" color="primary" component={Link} to='/admin/product'>Add Product</Button>


                </Grid>
            </Grid>
           
            <TableContainer component={Paper}>
                <Table className={classes.table} stickyHeader aria-label="sticky table">
                    <TableHead style={{fontWeight: 'bold', backgroundColor:'red'}}>
                        <TableRow >
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align='center'>Available</TableCell>
                            <TableCell align='center'>Delivery In</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (<TableRow key={product._id}>
                        <TableCell className='capitalize' component='th' scope='row'>{product.name}</TableCell>
                       
                        <TableCell>${product.price}</TableCell>
                        <TableCell align='center'>{product.available ? <CheckIcon color='primary' /> : <CloseIcon color='secondary' />}</TableCell>
                        <TableCell align='center'>{product.estimatedDelivery}</TableCell>
                        <TableCell  align='center'>
                            <>
                            <EditOutlinedIcon style={{marginRight: '15px'}} onClick={() => history.push(`/admin/product/edit/${product._id}`)} />
                            <DeleteForeverIcon  htmlColor='red' onClick={() => handleDelete(product._id)} /></>
                        </TableCell>
                        
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
    )
}

export default ProductList
