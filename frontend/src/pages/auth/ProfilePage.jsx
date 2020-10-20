import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { logout } from '../../reduxStore/actions/userActions'
import {useDispatch} from 'react-redux'

const ProfilePage = () => {
    const dispatch = useDispatch()
    return (
        <Grid container alignContent='center' justify='center' direction='column' >
            <Typography variant='h3'>Profile</Typography>
            <Grid item>
                <Button variant='outlined' onClick={() => dispatch(logout())} color='secondary'>Log Out</Button>
            </Grid>
        </Grid>
    )
}

export default ProfilePage
