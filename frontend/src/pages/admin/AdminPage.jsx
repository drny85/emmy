import { Container, Typography, Paper } from '@material-ui/core'
import React from 'react'
import ProductForm from '../../components/forms/ProductForm'

import './Admin.css'

const AdminPage = ({history}) => {

    const goToPage = (page) => {
        history.push('/admin/products')
    }   
    return (
        <Container>
           <Paper elevation={5} onClick={() => goToPage('products')} className='admin_tile'>
               <div className="title">
               <h4>Manage Products</h4>
               </div>
               
           </Paper>
        </Container>
    )
}

export default AdminPage
