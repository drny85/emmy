
import React, { useState } from 'react'
import { Divider, Grid } from '@material-ui/core';
import Controls from '../controls/Controls'
import { useForm, Form } from '../useForm'
import {addProduct} from '../../actions/products'
import {useDispatch} from 'react-redux'
import Loader from '../Loader';

import axios from '../../utils/axios'


const initialValues = {
    name: '',
    description:'',
    price: '',
    imageUrl: '',
    estimatedDelivery: '',
    available: true
   
}

const options = [{id:1, title: 3}, {id:2, title: 6}, {id: 3, title: 0}]

const ProductForm = () => {

    const dispatch = useDispatch()
    
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description.length > 10 ? "" : "Minimum 10 characters required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price.length !== 0 ? "" : "Price is required"
            
            if('estimatedDelivery' in fieldValues)
            temp.estimatedDelivery = fieldValues.estimatedDelivery.length !== 0 ? "": 'Estimated delivery is required'
       
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {values, handleInputChange, errors, setErrors, resetForm} = useForm(initialValues, true, validate)

    const handleImage = async e => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('imageUrl', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImageUrl(data)
            setUploading(false)
            
        } catch (error) {
            console.log(error)
            setUploading(false)
        }

    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(validate())
        if (validate()){
            values.imageUrl = imageUrl
            console.log(values)
           dispatch(addProduct({...values}))
           setImageUrl('')
          
           resetForm()
        }
    }

    return (
       <Form onSubmit={handleSubmit}>
          
            <Grid container>
                <Grid item sx={12} md={12}>
                   
                <Controls.Input name='name' className='capitalize' value={values.name} error={errors.name} label='Product Name' onChange={handleInputChange} />
               <Controls.Input name='description' value={values.description} error={errors.description} label='Product Description' onChange={handleInputChange} />
               <Controls.Input name='price' value={values.price} error={errors.price} type='number' step='1' min='0' label='Price' onChange={handleInputChange} />
               
               <Controls.Input  name='imageUrl' label='Image' type='file' inputProps={{autoFocus: true, disabled: uploading}} onChange={handleImage} />
               
               {uploading ? <Loader /> : (<Controls.Select name='estimatedDelivery' value={values.estimatedDelivery} error={errors.estimatedDelivery} label='Estimated Delivery Days' onChange={handleInputChange} options={options} />) }
               <Divider light />
               <div style={{marginTop: '15px'}}>
                        <Controls.Button
                            type="submit"
                            text="Add Product" />
                        <Controls.Button
                            text="Reset Form"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>

                
            </Grid>

           
       </Form>
    )
}

export default ProductForm
