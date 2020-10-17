
import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls'
import { useForm, Form } from '../useForm'

const initialValues = {
    name: '',
    lastName:'',
    email: '',
    password: '',
    confirmPassword: ''
    
}

const SignupForm = () => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName.length > 3 ? "" : "Minimum 3 characters required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {values, handleInputChange, errors, setErrors, resetForm, setValues} = useForm(initialValues, true, validate)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
           
            //resetForm()
        }
    }
    return (
       <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sx={12} md={12}>
                   
                <Controls.Input name='name' value={values.name} error={errors.name} label='First Name' onChange={handleInputChange} />
               <Controls.Input name='lastName' value={values.lastName} error={errors.lastName} label='Last Name' onChange={handleInputChange} />
               <Controls.Input name='email' value={values.email} error={errors.email} label='Email' onChange={handleInputChange} />
               <Controls.Input name='password' type='password' value={values.password} error={errors.password} label='Password' onChange={handleInputChange} />
               <Controls.Select  />
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
    )
}

export default SignupForm
