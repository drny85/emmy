import { Container, Typography } from '@material-ui/core'
import React from 'react'
import ProductForm from '../../components/forms/ProductForm'

const AdminPage = () => {
    return (
        <Container>
            <Typography variant='h4' align='center'>Admin Page</Typography>
            <ProductForm />
        </Container>
    )
}

export default AdminPage
