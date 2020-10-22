import { Divider, FormControlLabel, Grid, makeStyles, Switch, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'

import Controls from '../../components/controls/Controls'
import { Form, useForm } from '../../components/useForm'
import Loader from '../../components/Loader'
import {updateProduct, getProductById, resetProduct} from '../../reduxStore/actions/products'

const options = [1, 2, 3, ]
const initialValues = {
    name: '',
    description:'',
    price: '',
    imageUrl: '',
    estimatedDelivery: '',
    available: true
   
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minWidth: '568px',
        width: '70vw',
        margin: '0 auto',
       
      
    }
}))


const ProductEdit = ({match, history}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const productId = match.params.id
    const {product, loading} = useSelector(state => state.productsData)
    
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

    const {values, handleInputChange, errors, setErrors, resetForm, setValues} = useForm(initialValues, true, validate)

    const [isAvailable, setAvailable] = useState(values.available  ? 'yes' : 'no')
   

    const handleImage = async e => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('imageUrl', file)
       
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImageUrl(data)
            setUploading(true)
            
        } catch (error) {
            console.log(error)
            setUploading(false)
        }

    }

    const handleAvailabitity = (event) => {
       const value = event.target.value
       if(value === 'yes') {
           setAvailable('yes')
           setValues({...values, available: true})
       } else {
           setAvailable('no')
           setValues({...values, available: false})
       }
       // setAvailable();
      };

    const handleSubmit = async e => {
        e.preventDefault()
      
        if (validate()){
            if (uploading) {
                values.imageUrl = imageUrl
            }
           // 
            console.log(values)
          const updated = await dispatch(updateProduct({...values}))
          if (updated) {
            setImageUrl('')
          
            resetForm()
            history.push('/admin/products')

          }
         
        }
    }
    console.log(uploading)
   
    useEffect(() => {
            
            if(!product) {
                dispatch(getProductById(productId))
                
               
            }
        return () => {
            dispatch(resetProduct())
        }
    }, [dispatch])

    useEffect(() => {
        if (product) {
            setValues({...product})
            setAvailable(product.available ? 'yes': 'no')
        }
    }, [product])

  
   
    if (loading) return <Loader />
    return (
        <div className={classes.root}>
            <Typography align='center' variant='h4'>Edit/Update Product</Typography>
          <Form onSubmit={handleSubmit}>
          
          <Grid container>
              <Grid item sx={12} md={12}>
                 
              <Controls.Input name='name' className='capitalize' value={values.name} error={errors.name} label='Product Name' onChange={handleInputChange} />
             <Controls.Input name='description' value={values.description} error={errors.description} label='Product Description' onChange={handleInputChange} />
             <Controls.Input name='price' value={values.price} error={errors.price} type='number' step='1' min='0' label='Price' onChange={handleInputChange} />
             
             <Controls.Input  name='imageUrl' label='Image' type='file' inputProps={{autoFocus: true, disabled: uploading}} onChange={handleImage} />
             
             <Controls.Input name='estimatedDelivery' value={values.estimatedDelivery} label="Estimated Delivery Days" onChange={handleImage} />
             <Controls.RadioGroup name="available"  value={isAvailable} onChange={handleAvailabitity} label="Is Available" items={[{id: 'yes', title: 'Yes'}, {id: 'no', title: 'No'}]} />
             <Divider light />
             <div style={{marginTop: '15px'}}>
                      <Controls.Button
                          type="submit"
                          text="Update Product" />
                      <Controls.Button
                          text="Reset Form"
                          color="default"
                          onClick={resetForm} />
                  </div>
              </Grid>

              
          </Grid>

         
     </Form>
        </div>
    )
}

export default ProductEdit
