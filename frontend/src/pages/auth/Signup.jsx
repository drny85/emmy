import { Container, Divider, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import SignupForm from '../../components/forms/SignupForm'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import Loader from '../../components/Loader'


const Signup = ({location}) => {
    const history = useHistory()
    const {user, loading} = useSelector(state => state.userData)
    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (user) {
            history.push(redirect)
        }
    }, [user])

    if (loading) return <Loader />
    
    return (
        <Container>
            <Grid container direction='column' alignItems='center'>
             
            <Typography variant='h4'>Sign Up</Typography>
            <Divider variant='middle'  light />
           <SignupForm />
            </Grid>
          
           <Grid item>
               <p style={{padding: '12px 0px'}}>Have an account? <span><Link to='/login'>Sign In</Link></span></p>
           </Grid>
       
               
        </Container>
    )
}

export default Signup
