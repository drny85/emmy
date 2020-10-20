import { Container, Divider, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import SignupForm from '../../components/forms/SignupForm'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'


const Signup = () => {
    const history = useHistory()
    const {user} = useSelector(state => state.userData)
    console.log(user)

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, user)
    
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
