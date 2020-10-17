import { Container, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import SignupForm from '../../components/forms/SignupForm'






const Signup = () => {


    
    return (
        <Container>
            <Grid container direction='column' alignItems='center'>
             
            <Typography variant='h4'>Sign Up</Typography>
            <Divider variant='middle'  light />
           <SignupForm />
            </Grid>
           
               
        </Container>
    )
}

export default Signup
