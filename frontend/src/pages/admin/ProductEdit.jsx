import { Divider, Grid, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'

import Controls from '../../components/controls/Controls'
import { Form, useForm } from '../../components/useForm'
import Loader from '../../components/Loader'
import {editProduct, getProductById, resetProduct} from '../../reduxStore/actions/products'

const options = [{id:1, title: 3}, {id:2, title: 6}, {id: 3, title: 0}]
const initialValues = {
    name: '',
    description:'',
    price: '',
    imageUrl: '',
    estimatedDelivery: '',
    available: true
   
}


const ProductEdit = ({match}) => {
    const dispatch = useDispatch()
    const productId = match.params.id
    const {product, loading} = useSelector(state => state.productsData)
    
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [initialValues, setInitialValues] = useState({
        name: '',
        description:'',
        price: '',
        imageUrl: '',
        estimatedDelivery: '',
        available: true
       
    })

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
      
        if (validate()){
            values.imageUrl = imageUrl
           
           dispatch(editProduct({...values}))
           setImageUrl('')
          
           resetForm()
        }
    }
   
    useEffect(() => {
      
           dispatch(getProductById(productId))
           if(product) {
               setInitialValues(product)
           }
        //    setInitialValues(product)
        
        return () => {
            dispatch(resetProduct())
        }
    }, [productId, dispatch, getProductById])

    if (loading && !product) return <Loader />
    return (
        <div className="edit">
            <Typography align='center' variant='h4'>Edit/Update Product</Typography>
          <Form onSubmit={handleSubmit}>
          
          <Grid container>
              <Grid item sx={12} md={12}>
                 
              <Controls.Input name='name' className='capitalize' value={product?.name} error={errors.name} label='Product Name' onChange={handleInputChange} />
             <Controls.Input name='description' value={product?.description} error={errors.description} label='Product Description' onChange={handleInputChange} />
             <Controls.Input name='price' value={product?.price} error={errors.price} type='number' step='1' min='0' label='Price' onChange={handleInputChange} />
             
             <Controls.Input  name='imageUrl' label='Image'  type='file' inputProps={{autoFocus: true, disabled: uploading}} onChange={handleImage} />
             
             {uploading ? <Loader /> : (<Controls.Select name='estimatedDelivery' value={product?.estimatedDelivery} error={errors.estimatedDelivery} label='Estimated Delivery Days' onChange={handleInputChange} options={options} />) }
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
        </div>
    )
}

export default ProductEdit
