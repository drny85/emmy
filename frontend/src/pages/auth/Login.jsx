
import React, { useEffect } from 'react'
import { Button, Container, Divider, Grid, Typography } from '@material-ui/core';
import Controls from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../../components/Message'
import { login } from '../../reduxStore/actions/userActions';
import Loader from '../../components/Loader';
import { Link, useHistory } from 'react-router-dom';


const initialValues = {
    
    email: '',
    password: '',
    
    
}

const Login = ({location}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const { error, user, loading} = useSelector(state => state.userData)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
       
        if ('email' in fieldValues)
        temp.email = fieldValues.email.length !== 0 ? "": 'Email is required'
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length !== 0 ? "" : "Password is required."
            
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {values, handleInputChange, errors, setErrors, resetForm, setValues} = useForm(initialValues, true, validate)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
          
            dispatch(login(values))
           //resetForm()
        }
    }

    useEffect(() => {
        if (user) {
         history.push(redirect)
        }
    }, [user])

    if (loading) return <Loader />

    return (
        <Container style={{marginTop:'30px'}}>
            <Typography variant='h4' align='center'>Login</Typography>
       
       <Form onSubmit={handleSubmit}>
            
            <Grid container alignContent='center' justify='center'>
    {error && <Message type='error'>{error}</Message>}
                <Grid item sx={12} md={12} lg={8}>
               
               
               <Controls.Input name='email' value={values.email} error={errors.email} label='Email' onChange={handleInputChange} />
               <Controls.Input name='password' type='password' value={values.password} error={errors.password} label='Password' onChange={handleInputChange} />
              
               {/* <Controls.Select  /> */}
               <div style={{marginTop: '15px'}}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>

                
            </Grid>

           
       </Form>
       <Divider light />
       <Grid container>
           <Grid item>
               <p style={{padding: '12px 0px', color: 'GrayText'}}>Do not have an account? <span style={{marginLeft: '10px'}}><Link to='/signup'>Sign Up</Link></span></p>
           </Grid>
       </Grid>
       </Container>
    )
}

export default Login