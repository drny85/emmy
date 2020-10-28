import { Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Form, useForm } from '../../components/useForm'
import Controls from '../../components/controls/Controls'

const initialValues = {
    name: '',
    lastName: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    email: '',
}

const ShippingPage = ({history}) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
       
        if ('name' in fieldValues)
        temp.name = fieldValues.name ? "": 'Name is required'
       
        
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName.length !== 0 ? "" : "Last Name is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address.length !== 0 ? "" : "Address is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city.length !== 0 ? "" : "City is required."
        if ('state' in fieldValues)
            temp.state = fieldValues.state.length !== 0 ? "" : "State is required."
        if ('zipcode' in fieldValues)
            temp.zipcode = fieldValues.zipcode.length !== 0 ? "" : "Postal code is required."
        if ('zipcode' in fieldValues)
            temp.zipcode = fieldValues.zipcode.length === 5 ? "" : "5 digits zip code required."
         if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length !== 0 ? "" : "Phone is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length >= 10 && fieldValues.phone.length > 1 ? "" : "Invalid phone."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {values, handleInputChange, errors, setErrors, resetForm, setValues} = useForm(initialValues,true,validate)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            try {
                localStorage.setItem('shippingAddress', JSON.stringify(values))
                history.push('/order-summary')
            } catch (error) {
            console.error(error)
            return
            }
            
             
           // resetForm()
         }
    }

    useEffect(() => {
        const shipping = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null
        console.log(shipping)
        if (shipping) {
            
            setValues({...shipping})
        }
    }, [])
    return (
        
           
            <Container>
                
                <Grid container alignItems='center' justify='center' style={{margin: 'auto'}} direction='column'>
                    <h2 style={{textAlign: 'center', padding: '1rem'}}>Shipping Address</h2>
                    <Grid item xs={12} md={12}>
                        <Form onSubmit={handleSubmit}>
                            <Controls.Input name='name' autoFocus value={values.name} error={errors.name} onChange={handleInputChange} label='First Name' />
                            <Controls.Input name='lastName' value={values.lastName} error={errors.lastName} onChange={handleInputChange} label='Last Name' />
                            <Controls.Input name='address' value={values.address} error={errors.address} onChange={handleInputChange} label='Address' placeholder='Ex. 123 Main St' />
                            <Controls.Input name='apt' value={values.apt} onChange={handleInputChange} label='Apartment / Suite' placeholder='Ex. Apt 1A' />
                            <Controls.Input name='city' value={values.city} error={errors.city} onChange={handleInputChange} label='City' placeholder='Please enter your city' />
                            <Controls.Input name='state' value={values.state} error={errors.state} onChange={handleInputChange} label='State' placeholder='Please enter your state' />
                            <Controls.Input name='zipcode' value={values.zipcode} inputProps={{maxLength: 5}} error={errors.zipcode} onChange={handleInputChange} label='Postal Code' placeholder='Ex 12345' />
                            <Controls.Input name='phone' value={values.phone} error={errors.phone} onChange={handleInputChange} label='Phone' placeholder='Ex. (555)-555-0000' />
                            <Controls.Input name='email' value={values.email}  error={errors.email} onChange={handleInputChange} label='Email Address' placeholder='Ex. johndoe@email.com' />
                            
                            <div className="btn_div">
                                <Controls.Button text="Continue to Payment" type='submit' />
                                <Controls.Button
                            text="Reset Form"
                            color="secondary"
                            onClick={resetForm} />
                            </div>
                        </Form>
                    </Grid>
                    <Grid item xs={12} md={5}>

                    </Grid>
                </Grid>
                </Container>
           

    )
}

export default ShippingPage
